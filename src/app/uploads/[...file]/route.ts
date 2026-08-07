import { readFile } from "node:fs/promises";
import path from "node:path";

const mimeTypes: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
export async function GET(_: Request, { params }: { params: Promise<{ file: string[] }> }) {
  const { file } = await params;
  if (file.length !== 2 || file[0] !== "speakers" || file.some(part => !/^[a-zA-Z0-9._-]+$/.test(part))) return new Response("Not found", { status: 404 });
  const extension = path.extname(file[1]).toLowerCase();
  const mime = mimeTypes[extension];
  if (!mime) return new Response("Not found", { status: 404 });
  try { const data = await readFile(path.join(process.env.UPLOAD_DIR ?? "/app/uploads", ...file)); return new Response(data, { headers: { "Content-Type": mime, "Cache-Control": "public, max-age=31536000, immutable" } }); }
  catch { return new Response("Not found", { status: 404 }); }
}
