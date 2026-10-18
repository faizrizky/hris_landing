import { z } from "zod";

/**
 * Sama dengan skema CMS (hris-cms `endpoints/submitContact.ts`). Galat dilaporkan per kolom;
 * antarmuka menampilkan pesan Indonesia untuk kolom itu.
 */
export const contactSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  organization: z.string().trim().min(2).max(160),
  email: z.string().trim().toLowerCase().pipe(z.email().max(200)),
  // Hanya angka (boleh diawali + untuk kode negara): 8–15 angka, batas internasional.
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{8,15}$/),
  employeeCount: z.string().trim().max(60).optional().default(""),
  industry: z.string().trim().max(80).optional().default(""),
  interest: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

/** Kolom anti-spam yang ikut terkirim bersama form tetapi tidak pernah sampai ke CMS. */
export const antiSpamSchema = z.object({
  /** Honeypot: tersembunyi bagi manusia, bot mengisinya. */
  website: z.string().max(0).optional().default(""),
  /** Waktu form ditampilkan (ms sejak epoch). */
  startedAt: z.coerce.number().int().positive(),
});

export const MIN_FILL_TIME_MS = 2_500;
