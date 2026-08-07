import { z } from "zod";
export const clean = (s: string) => s.trim().replace(/\s+/g, " ");
const field = (min:number,max:number) => z.string().transform(clean).refine(v => v.length >= min && v.length <= max);
export const participantRoles = ["COORDINATOR", "ADMINISTRATOR", "EMPLOYEE", "GUEST", "OTHER"] as const;
export const registrationInput = z.object({ firstName: field(2,100), lastName: field(2,100), city: field(2,150), email: z.string().transform(v=>clean(v).toLowerCase()).pipe(z.string().email().max(254)), role: z.enum(participantRoles), eventIds: z.array(z.number().int().positive()).length(3), idempotencyKey: z.string().uuid() });
export const places = (n:number) => `${n} ${n % 10 === 1 && n % 100 !== 11 ? "место" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? "места" : "мест"}`;
