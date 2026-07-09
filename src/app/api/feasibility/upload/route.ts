import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { ACCEPTED_UPLOAD_MIME, MAX_UPLOAD_BYTES } from '@/components/feasibility/feasibility';

export const runtime = 'nodejs';

// Token handler for Vercel Blob CLIENT uploads: the browser uploads straight
// to Blob storage and only exchanges a scoped token here. Files must not pass
// through this function; its ~4.5 MB body limit is far under our 15 MB promise
// (a 6.5 MB floor plan 413'd in production before this).
export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Uploads aren't configured in this environment." }, { status: 503 });
  }

  // Tabs opened before the client-upload change still send multipart bodies.
  // Their bundle shows this error text verbatim, so make it the instruction.
  if ((request.headers.get('content-type') ?? '').includes('multipart/form-data')) {
    return NextResponse.json({ error: 'Please refresh this page and try again.' }, { status: 400 });
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: 'Invalid upload request.' }, { status: 400 });
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith('feasibility/')) {
          throw new Error('Invalid upload path.');
        }
        return {
          allowedContentTypes: Object.values(ACCEPTED_UPLOAD_MIME),
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          addRandomSuffix: true,
        };
      },
      // Fires from Vercel's side once the browser finishes uploading. Nothing
      // to do: the submit route carries the blob URL into the email.
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(jsonResponse);
  } catch (err) {
    console.error('[feasibility/upload] token exchange failed', err);
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 400 });
  }
}
