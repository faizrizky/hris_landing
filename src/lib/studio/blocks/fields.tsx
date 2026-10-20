"use client";

import type { Field, Fields } from "@puckeditor/core";

import type { SiteData } from "@/components/blocks/types";
import { LinkPickerField, MediaField, RelationField, TagsField } from "@/components/studio/fields";
import { mediaUrl } from "@/lib/cms/media";
import type { LinkGroup } from "@/lib/studio/load";
import { studioStrings, type StudioLang } from "@/lib/studio/strings";
import type { Feature, Partner, Solution } from "@/types/cms";

import type { AnyProps } from "./metadata";
import { randomId } from "@/lib/studio/random-id";

export type StudioContext = {
  lang: StudioLang;
  locale: string;
  cmsUrl: string;
  data: SiteData;
  pageId: number;
  embedded: boolean;
  linkGroups: LinkGroup[];
};

/** Field builders for the editor's forms, in the editor's language. */
export function createFields({ lang, cmsUrl, data, linkGroups }: StudioContext) {
  const s = studioStrings[lang];
  const L = (en: string, id: string) => (lang === "id" ? id : en);
  const rowId = () => randomId().replace(/-/g, "").slice(0, 24);

  // ── Field builders (mirror the CMS schema) ─────────────────────────────
  // Copy fields are editable directly on the canvas (click the text and type);
  // links, URLs and short technical values stay form-only.
  const text = (en: string, id: string): Field => ({ type: "text", label: L(en, id), contentEditable: true });
  const textarea = (en: string, id: string): Field => ({ type: "textarea", label: L(en, id), contentEditable: true });
  const plain = (en: string, id: string): Field => ({ type: "text", label: L(en, id) });
  /** Where a button/card leads: picked from a list, not typed. */
  const link = (en: string, id: string): Field => ({
    type: "custom",
    label: L(en, id),
    render: ({ field, value, onChange }) => (
      <LinkPickerField label={field.label ?? ""} value={value} onChange={onChange} groups={linkGroups} s={s} />
    ),
  });
  const number = (en: string, id: string): Field => ({ type: "number", label: L(en, id), min: 0 });
  const select = (en: string, id: string, options: [string, string, string][]): Field => ({
    type: "select",
    label: L(en, id),
    options: options.map(([value, oe, oi]) => ({ value, label: L(oe, oi) })),
  });
  const radio = (en: string, id: string, options: [string, string, string][]): Field =>
    ({
      ...select(en, id, options),
      type: "radio",
    }) as Field;
  const toggle = (en: string, id: string): Field => ({
    type: "radio",
    label: L(en, id),
    options: [
      { value: true, label: L("Yes", "Ya") },
      { value: false, label: L("No", "Tidak") },
    ],
  });
  const image = (en: string, id: string): Field => ({
    type: "custom",
    label: L(en, id),
    render: ({ field, value, onChange }) => (
      <MediaField label={field.label ?? ""} value={value} onChange={onChange} cmsUrl={cmsUrl} s={s} />
    ),
  });
  const video = (en: string, id: string): Field => ({
    type: "custom",
    label: L(en, id),
    render: ({ field, value, onChange }) => (
      <MediaField label={field.label ?? ""} value={value} onChange={onChange} cmsUrl={cmsUrl} s={s} kind="video" />
    ),
  });
  const tags = (en: string, id: string): Field => ({
    type: "custom",
    label: L(en, id),
    render: ({ field, value, onChange }) => (
      <TagsField label={field.label ?? ""} value={value} onChange={onChange} s={s} />
    ),
  });
  const partnersField = (en: string, id: string): Field => ({
    type: "custom",
    label: L(en, id),
    render: ({ field, value, onChange }) => (
      <RelationField<Partner>
        label={field.label ?? ""}
        value={value}
        onChange={onChange}
        options={data.partners}
        createHref={`${cmsUrl}/admin/collections/partners/create`}
        toOption={(p) => ({ id: p.id, label: p.name, image: mediaUrl(p.logo) })}
        s={s}
      />
    ),
  });
  const featuresField = (en: string, id: string): Field => ({
    type: "custom",
    label: L(en, id),
    render: ({ field, value, onChange }) => (
      <RelationField<Feature>
        label={field.label ?? ""}
        value={value}
        onChange={onChange}
        options={data.features}
        createHref={`${cmsUrl}/admin/collections/features/create`}
        toOption={(f) => ({ id: f.id, label: f.name })}
        s={s}
      />
    ),
  });
  const solutionsField = (en: string, id: string): Field => ({
    type: "custom",
    label: L(en, id),
    render: ({ field, value, onChange }) => (
      <RelationField<Solution>
        label={field.label ?? ""}
        value={value}
        onChange={onChange}
        options={data.solutions}
        createHref={`${cmsUrl}/admin/collections/solutions/create`}
        toOption={(x) => ({ id: x.id, label: x.name })}
        s={s}
      />
    ),
  });
  /** Satu fitur dipilih dari daftar fitur (nilai: id fitur). */
  const featureSelect = (en: string, id: string): Field => ({
    type: "select",
    label: L(en, id),
    options: [{ value: null as never, label: L("— None —", "— Tidak ada —") }, ...data.features.map((x) => ({ value: x.id, label: x.name }))],
  });
  const align = () =>
    radio("Alignment", "Perataan", [
      ["left", "Left", "Kiri"],
      ["center", "Center", "Tengah"],
      ["right", "Right", "Kanan"],
    ]);
  const style = () =>
    select("Style", "Gaya", [
      ["fill", "Fill", "Penuh"],
      ["stroke", "Outline", "Garis"],
    ]);
  const header = (): Field => ({
    type: "object",
    label: L("Section heading", "Judul bagian"),
    objectFields: {
      title: textarea("Title", "Judul"),
      description: textarea("Description", "Deskripsi"),
    },
  });
  /** Daftar teks sederhana (chip, poin, jaminan): satu kolom teks per baris. */
  const textList = (en: string, id: string, max?: number): Field => ({
    type: "array",
    label: L(en, id),
    max,
    getItemSummary: (item: AnyProps) => String(item.text || "…"),
    defaultItemProps: () => ({ id: rowId(), text: L("New text", "Teks baru") }),
    arrayFields: { text: text("Text", "Teks") },
  });
  const buttons = (max = 4): Field => ({
    type: "array",
    label: L("Buttons", "Tombol"),
    max,
    getItemSummary: (item: AnyProps) => String(item.label || "…"),
    defaultItemProps: () => ({
      id: rowId(),
      label: L("Request a demo", "Minta demo"),
      href: "/demo",
      style: "fill",
    }),
    arrayFields: { label: text("Label", "Label"), href: link("Link", "Link"), style: style() },
  });
  const list = (
    en: string,
    id: string,
    arrayFields: Fields,
    summaryKey: string,
    defaults: AnyProps,
    max?: number,
  ): Field => ({
    type: "array",
    label: L(en, id),
    max,
    getItemSummary: (item: AnyProps) => String(item[summaryKey] || "…"),
    // Rows get an id up front so React keys and CMS translations stay stable.
    defaultItemProps: () => ({ id: rowId(), ...defaults }),
    arrayFields,
  });
  const headerDefaults = {
    title: L("Section title", "Judul bagian"),
    description: L("A short description of this section.", "Deskripsi singkat bagian ini."),
  };

  return {
    s,
    data,
    L,
    rowId,
    text,
    textarea,
    plain,
    link,
    number,
    select,
    radio,
    toggle,
    image,
    video,
    tags,
    partnersField,
    featuresField,
    solutionsField,
    featureSelect,
    align,
    style,
    header,
    textList,
    buttons,
    list,
    headerDefaults,
  };
}

export type StudioFields = ReturnType<typeof createFields>;
