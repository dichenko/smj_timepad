import crypto from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const maxBytes = Number(process.env.MAX_UPLOAD_SIZE_MB ?? 5) * 1024 * 1024;
const uploadRoot = process.env.UPLOAD_DIR ?? "/app/uploads";
const signatures: Array<{ mime: string; extension: string; matches: (data: Buffer) => boolean }> = [
  { mime: "image/jpeg", extension: "jpg", matches: d => d.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])) },
  { mime: "image/png", extension: "png", matches: d => d.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  { mime: "image/webp", extension: "webp", matches: d => d.subarray(0, 4).toString() === "RIFF" && d.subarray(8, 12).toString() === "WEBP" },
];

export async function saveSpeakerPhoto(file: File | null) {
  if (!file || file.size === 0) return null;
  if (file.size > maxBytes) throw new Error("Размер фотографии не должен превышать 5 МБ.");
  const data = Buffer.from(await file.arrayBuffer());
  const type = signatures.find(candidate => candidate.matches(data));
  if (!type) throw new Error("Загрузите фотографию в формате JPEG, PNG или WebP.");
  const directory = path.join(uploadRoot, "speakers");
  await mkdir(directory, { recursive: true });
  const fileName = `${crypto.randomUUID()}.${type.extension}`;
  await writeFile(path.join(directory, fileName), data, { flag: "wx" });
  return `/uploads/speakers/${fileName}`;
}
