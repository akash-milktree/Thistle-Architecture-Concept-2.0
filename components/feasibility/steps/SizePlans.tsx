"use client";

import React, { useState } from 'react';
import { upload } from '@vercel/blob/client';
import { useFeasibility } from '../FeasibilityContext';
import {
  ACCEPTED_UPLOAD_ATTR,
  ACCEPTED_UPLOAD_EXT,
  MAX_UPLOAD_BYTES,
  uploadExt,
  uploadMime,
  type UploadedFile,
} from '../feasibility';
import { Field, Adorned, DropZone, inputClass } from '../FormBits';

// Client upload: browser -> Vercel Blob directly. /api/feasibility/upload only
// issues the scoped token, so the ~4.5 MB function body limit never applies.
async function uploadOne(file: File): Promise<UploadedFile> {
  if (!ACCEPTED_UPLOAD_EXT.includes(uploadExt(file.name))) throw new Error('Unsupported file type.');
  if (file.size > MAX_UPLOAD_BYTES) throw new Error('File is too large (max 15 MB).');
  const safeName = file.name.replace(/[^\w.\-]+/g, '_').slice(-80);
  try {
    const blob = await upload(`feasibility/${safeName}`, file, {
      access: 'public',
      handleUploadUrl: '/api/feasibility/upload',
      contentType: uploadMime(file.name, file.type),
    });
    return { url: blob.url, name: file.name };
  } catch {
    throw new Error('Upload failed. Please try again.');
  }
}

export const SizePlans: React.FC<{ onUploadingChange: (uploading: boolean) => void }> = ({ onUploadingChange }) => {
  const { answers, setAnswer, files, setFiles, errors, setErrors } = useFeasibility();
  const [uploading, setUploading] = useState(false);

  const setBusy = (busy: boolean) => {
    setUploading(busy);
    onUploadingChange(busy);
  };

  async function onFloorPlan(file: File | undefined) {
    if (!file) return;
    setErrors((e) => ({ ...e, floorPlan: '' }));
    setBusy(true);
    try {
      const up = await uploadOne(file);
      setFiles((f) => ({ ...f, floorPlan: up }));
    } catch (e) {
      setErrors((er) => ({ ...er, floorPlan: e instanceof Error ? e.message : 'Upload failed.' }));
    } finally {
      setBusy(false);
    }
  }

  async function onOtherDocs(list: FileList | null) {
    if (!list?.length) return;
    setBusy(true);
    try {
      for (const file of Array.from(list)) {
        try {
          const up = await uploadOne(file);
          setFiles((f) => ({ ...f, otherDocs: [...f.otherDocs, up] }));
        } catch (e) {
          setErrors((er) => ({ ...er, otherDocs: e instanceof Error ? e.message : 'Upload failed.' }));
        }
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-5">
      <Field label="Total existing GIA across all floors (approx)" error={errors.gia}>
        <Adorned suffix="m²">
          <input
            className={`${inputClass} pr-12`}
            placeholder="e.g. 120"
            value={answers.gia}
            onChange={(e) => setAnswer('gia', e.target.value)}
          />
        </Adorned>
      </Field>

      <Field label="Which floor is the relevant property on? (optional)">
        <input className={inputClass} value={answers.floorNote} onChange={(e) => setAnswer('floorNote', e.target.value)} />
      </Field>

      <Field plain label="Property floor plan" error={errors.floorPlan}>
        <DropZone
          accept={ACCEPTED_UPLOAD_ATTR}
          onFile={onFloorPlan}
          uploading={uploading}
          current={files.floorPlan?.name}
          title="Upload the property floor plan"
          hint="PDF, image or document, up to 15 MB"
        />
      </Field>

      <Field plain label="Other documents or images (optional)" error={errors.otherDocs}>
        <DropZone
          accept={ACCEPTED_UPLOAD_ATTR}
          multiple
          onFiles={onOtherDocs}
          currentList={files.otherDocs.map((d) => d.name)}
          title="Add any other documents"
          hint="Photos, surveys, listings, anything useful"
          compact
        />
      </Field>
    </div>
  );
};
