"use client";

import { useId, useState, type FormEvent } from "react";

import type { ContactField } from "@/lib/contact-schema";
import { contactSchema } from "@/lib/contact-schema";
import { cn } from "@/utilities/ui";

import type { BlockContext } from "./types";
import { VisualFromBlock, type VisualBlockData } from "./visual";
import { tagFor } from "@/features/home/content/tones";
import { PageSection } from "@/features/site/components/page-section";
import type { Page } from "@/types/cms";

type Block = Extract<Page["layout"][number], { blockType: "contactForm" }>;

type Status = { state: "idle" | "submitting" } | { state: "success" } | { state: "error"; message: string };
type FieldErrors = Partial<Record<ContactField, true>>;

const FIELD_LABEL: Record<"fullName" | "organization" | "email" | "phone", string> = {
  fullName: "Nama lengkap",
  organization: "Perusahaan",
  email: "Email kerja",
  phone: "Nomor WhatsApp",
};

const FIELD_ERROR: Record<ContactField, string> = {
  fullName: "Isi nama lengkap (minimal 2 huruf).",
  organization: "Isi nama perusahaan.",
  email: "Isi email yang valid.",
  phone: "Isi nomor 8–15 angka.",
  employeeCount: "Pilihan tidak valid.",
  industry: "Pilihan tidak valid.",
  interest: "Pilihan tidak valid.",
  message: "Pesan terlalu panjang.",
};

/** Nomor telepon hanya angka, satu + di awal; paling banyak 16 karakter. */
const phoneDigits = (value: string) => {
  const trimmed = value.trimStart();
  return ((trimmed.startsWith("+") ? "+" : "") + trimmed.replace(/\D/g, "")).slice(0, 16);
};

const FORM_ERROR_NETWORK = "Pesan belum terkirim. Coba lagi sebentar lagi.";

/** Formulir minta demo. Dikirim lewat /api/contact (server) ke Inbox CMS; browser tidak pernah menghubungi CMS. */
export function ContactFormBlock({ block, ctx }: { block: Block; ctx: BlockContext }) {
  const id = useId();
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  const employeeOptions = block.employeeCountOptions ?? [];
  const industryOptions = block.industryOptions ?? [];

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.state === "submitting") return;
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries()) as Record<string, string>;
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as ContactField] = true;
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website: values.website ?? "", startedAt }),
      });
      if (res.status === 400) {
        const refused = (await res.json().catch(() => ({}))) as { fields?: ContactField[] };
        const next: FieldErrors = {};
        for (const field of refused.fields ?? []) next[field] = true;
        setErrors(next);
        setStatus({ state: "idle" });
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ state: "success" });
    } catch {
      setStatus({ state: "error", message: FORM_ERROR_NETWORK });
    }
  };

  const form =
    status.state === "success" ? (
      <div role="status" className="rounded-3xl bg-white p-6 shadow-[0_24px_60px_-30px_rgba(60,60,140,0.5)] md:p-10">
        <p className="t-head max-w-[18ch]">{block.successTitle}</p>
        <p className="t-statement mt-4 max-w-[40ch] text-ink-soft">{block.successMessage}</p>
      </div>
    ) : (
      <form
        onSubmit={onSubmit}
        noValidate
        className="max-w-2xl space-y-6 rounded-3xl bg-white p-6 shadow-[0_24px_60px_-30px_rgba(60,60,140,0.5)] md:p-10"
      >
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Jangan diisi
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {(Object.keys(FIELD_LABEL) as (keyof typeof FIELD_LABEL)[]).map((name) => (
          <div key={name}>
            <label htmlFor={`${id}-${name}`} className="block font-semibold">
              {FIELD_LABEL[name]}
              <span className="sr-only"> (wajib)</span>
            </label>
            <input
              id={`${id}-${name}`}
              name={name}
              type={name === "email" ? "email" : name === "phone" ? "tel" : "text"}
              autoComplete={{ fullName: "name", organization: "organization", email: "email", phone: "tel" }[name]}
              required
              aria-invalid={Boolean(errors[name])}
              aria-describedby={errors[name] ? `${id}-${name}-error` : undefined}
              onInput={
                name === "phone"
                  ? (e) => {
                      const input = e.currentTarget;
                      const clean = phoneDigits(input.value);
                      if (clean !== input.value) input.value = clean;
                    }
                  : undefined
              }
              className={cn("field mt-2", errors[name] && "ring-2 ring-ink")}
            />
            {errors[name] && (
              <p id={`${id}-${name}-error`} role="alert" className="mt-1 font-semibold">
                {FIELD_ERROR[name]}
              </p>
            )}
          </div>
        ))}

        {employeeOptions.length > 0 && (
          <div>
            <label htmlFor={`${id}-employeeCount`} className="block font-semibold">
              Jumlah karyawan (opsional)
            </label>
            <select id={`${id}-employeeCount`} name="employeeCount" defaultValue="" className="field mt-2">
              <option value="">Pilih</option>
              {employeeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {industryOptions.length > 0 && (
          <div>
            <label htmlFor={`${id}-industry`} className="block font-semibold">
              Jenis usaha (opsional)
            </label>
            <select id={`${id}-industry`} name="industry" defaultValue="" className="field mt-2">
              <option value="">Pilih</option>
              {industryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor={`${id}-message`} className="block font-semibold">
            Yang ingin kamu selesaikan (opsional)
          </label>
          <textarea id={`${id}-message`} name="message" rows={4} className="field mt-2" />
          {errors.message && (
            <p role="alert" className="mt-1 font-semibold">
              {FIELD_ERROR.message}
            </p>
          )}
        </div>

        {status.state === "error" && (
          <p role="alert" className="font-semibold">
            {status.message}
          </p>
        )}

        <button type="submit" disabled={status.state === "submitting"} className="btn w-full disabled:opacity-60 md:w-auto">
          {status.state === "submitting" ? "Mengirim…" : block.submitLabel}
        </button>
      </form>
    );

  return (
    <PageSection
      title={block.header?.title}
      description={block.header?.description ?? undefined}
      tag={tagFor(block.tag)}
      ariaLabel={block.header?.title}
      visual={<VisualFromBlock visual={block.visual as VisualBlockData} ctx={ctx} />}
    >
      {form}
    </PageSection>
  );
}
