export function publicUrl(path: string) {
  const base = process.env.APP_URL;
  if (!base) return path;
  return new URL(path, base).toString();
}
