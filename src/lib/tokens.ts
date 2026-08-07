import crypto from "crypto";
export const newToken = () => crypto.randomBytes(32).toString("base64url");
export const tokenHash = (token:string) => crypto.createHash("sha256").update(token).digest("hex");
export const ticketNumber = (id:number) => `CONF-2026-${String(id).padStart(4,"0")}`;
