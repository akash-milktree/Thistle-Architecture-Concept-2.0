import { put } from '@vercel/blob';
import { NextResponse, type NextRequest } from 'next/server';
import { ACCEPTED_UPLOAD_EXT, MAX_UPLOAD_BYTES } from '@/components/feasibility/feasibility';

export const runtime = 'nodejs';

// Accepts a single file (multipart), stores it in Vercel Blob with a
// non-guessable key, and returns its URL. Gated on BLOB_READ_WRITE_TOKEN so
// environments without the token degrade gracefully instead of throwing.
export async function POST(req: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Uploads aren't configured in this environment." }, { status: 503 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid upload.' }, { status: 400 });
  }

  const file = form.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: 'File is too large (max 15 MB).' }, { status: 400 });
  }
  const ext = '.' + (file.name.split('.').pop() ?? '').toLowerCase();
  if (!ACCEPTED_UPLOAD_EXT.includes(ext)) {
    return NextResponse.json({ error: 'Unsupported file type.' }, { status: 400 });
  }

  try {
    const safeName = file.name.replace(/[^\w.\-]+/g, '_').slice(-80);
    const blob = await put(`feasibility/${safeName}`, file, { access: 'public', addRandomSuffix: true });
    return NextResponse.json({ url: blob.url, name: file.name });
  } catch (err) {
    console.error('[feasibility/upload] blob put failed', err);
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }
}
