"use client";

import type { ComponentConfig, Fields } from "@puckeditor/core";

import { blockComponents } from "@/components/blocks/RenderBlocks";
import type { BlockContext } from "@/components/blocks/types";
import type { Page } from "@/types/cms";

import type { StudioFields } from "./fields";
import { meta, type AnyProps } from "./metadata";

type Block = Page["layout"][number];

const VISUAL_KINDS: [string, string, string][] = [
  ["isometric", "Isometric mockup (panel + phone + cards)", "Mockup isometrik (panel + HP + kartu)"],
  ["board", "Pastel card board", "Papan kartu pastel"],
  ["phone", "Phone with a list", "HP berisi daftar"],
  ["offer", "Checked price card", "Kartu harga bercentang"],
  ["tilted", "Tilted pastel cards", "Kartu pastel miring"],
  ["calculator", "Calculator panel", "Panel kalkulator"],
  ["panel", "Panel with a badge and floating labels", "Panel lencana dan label melayang"],
  ["shield", "Large shield", "Perisai besar"],
  ["none", "No image", "Tanpa gambar"],
];

const TONES: [string, string, string][] = [
  ["sky", "Sky blue", "Biru muda"],
  ["lavender", "Lavender", "Lavender"],
  ["peach", "Peach", "Peach"],
];

const TINTS: [string, string, string][] = [["white", "White", "Putih"], ...TONES];

const ACCESSORIES: [string, string, string][] = [
  ["bell", "Bell", "Lonceng"],
  ["shield", "Shield", "Perisai bercentang"],
  ["checkCircle", "Check circle", "Lingkaran centang"],
  ["users", "People", "Orang"],
  ["calculator", "Calculator", "Kalkulator"],
  ["wallet", "Wallet", "Dompet"],
  ["chat", "Chat", "Chat"],
  ["chart", "Chart", "Grafik"],
  ["calendar", "Calendar", "Kalender"],
  ["clock", "Clock", "Jam"],
  ["document", "Document", "Dokumen"],
  ["lock", "Lock", "Gembok"],
  ["star", "Star", "Bintang"],
];

const ROWS_SOURCES: [string, string, string][] = [
  ["manual", "Manual (below)", "Isi manual (di bawah)"],
  ["features", "Automatic from Features", "Otomatis dari Fitur"],
  ["solutions", "Automatic from Solutions", "Otomatis dari Solusi"],
  ["calculators", "Automatic from the calculators", "Otomatis dari kalkulator"],
];

/** Bagian siap pakai (Hero, Pita HP, Harga, FAQ…), dirender dengan komponen blok situs yang sama. */
export function sectionComponents(f: StudioFields): Record<string, ComponentConfig<AnyProps>> {
  const {
    text,
    textarea,
    plain,
    link,
    number,
    select,
    toggle,
    tags,
    partnersField,
    featuresField,
    solutionsField,
    header,
    textList,
    buttons,
    list,
    headerDefaults,
    L,
  } = f;

  // Tiap bagian merender komponen blok situs.
  const section = <T extends Block["blockType"]>(
    type: T,
    config: Omit<ComponentConfig<AnyProps>, "render">,
  ): ComponentConfig<AnyProps> => ({
    ...config,
    render: ({ puck, id, editMode: _editMode, ...props }) => {
      const Component = blockComponents[type] as unknown as React.ComponentType<{ block: Block; ctx: BlockContext }>;
      return <Component block={{ ...props, id, blockType: type } as unknown as Block} ctx={meta(puck).ctx} />;
    },
  });

  const anchor = () => plain("Anchor (for #links)", "Anchor (untuk tautan #)");
  const tag = () => plain("Label (pill)", "Label kecil (pill)");
  const tint = () => select("Background band", "Pita latar", TINTS);

  /** Gambar beranimasi: jenis, warna, lencana, judul, sumber baris, dan baris manual. */
  const visual = (): Fields<AnyProps>[string] => ({
    type: "object",
    label: L("Animated image", "Gambar beranimasi"),
    objectFields: {
      kind: select("Kind", "Jenis", VISUAL_KINDS),
      tone: select("Colour", "Warna", TONES),
      accessory: select("Badge", "Lencana", ACCESSORIES),
      title: text("Title", "Judul"),
      rowsSource: select("Rows come from", "Isi baris dari", ROWS_SOURCES),
      rows: list(
        "Rows (manual)",
        "Baris (manual)",
        { title: text("Title", "Judul"), detail: text("Detail", "Keterangan"), badge: text("Label", "Label") },
        "title",
        { title: L("New row", "Baris baru") },
        6,
      ),
    },
  });

  const defaultVisual = (kind: string) => ({ kind, tone: "peach", accessory: "shield", rowsSource: "manual", rows: [] });

  return {
    hero: section("hero", {
      label: "Hero",
      fields: {
        variant: select("Variant", "Varian", [
          ["home", "Home — two-line title + isometric mockup", "Beranda — judul dua baris + mockup isometrik"],
          ["page", "Inner page — text + animated image", "Halaman dalam — teks + gambar beranimasi"],
        ]),
        tag: tag(),
        titleLineOne: plain("Title, line 1", "Judul, baris 1"),
        titleLineTwo: plain("Title, line 2 (blue)", "Judul, baris 2 (biru)"),
        title: textarea("Title", "Judul"),
        note: text("Small note (orange)", "Catatan kecil (oranye)"),
        description: textarea("Description", "Deskripsi"),
        buttons: buttons(2),
        mockup: {
          type: "object",
          label: L("Mockup content", "Isi mockup"),
          objectFields: {
            approvalsTitle: text("Approvals panel title", "Judul panel persetujuan"),
            approvals: list(
              "Approval rows",
              "Baris persetujuan",
              { person: plain("Employee", "Karyawan"), detail: text("Request", "Pengajuan"), status: plain("Status", "Status") },
              "person",
              { person: L("Name", "Nama"), detail: "", status: "" },
              4,
            ),
            doneLabel: plain("Status that counts as done", "Status yang dianggap selesai"),
            attendanceTitle: text("Attendance title", "Judul absen"),
            attendanceFigure: text("Attendance figure", "Angka absen"),
            attendanceDetail: text("Attendance detail", "Keterangan absen"),
            payslipTitle: text("Payslip title", "Judul slip gaji"),
            payslipDetail: text("Payslip detail", "Keterangan slip gaji"),
            phoneChips: textList("Phone chips", "Chip di HP", 3),
          },
        },
        trustPoints: list(
          "Four strengths",
          "Empat keunggulan",
          { title: text("Title", "Judul"), description: textarea("Description", "Deskripsi") },
          "title",
          { title: L("Strength", "Keunggulan"), description: "" },
          4,
        ),
        visual: visual(),
      },
      resolveFields: (item, { fields }) => {
        const { tag: tagField, titleLineOne, titleLineTwo, title, note, mockup, trustPoints, visual: visualField, ...rest } =
          fields as Fields<AnyProps>;
        const isHome = item.props.variant === "home";
        return {
          ...(isHome ? { titleLineOne, titleLineTwo } : { tag: tagField, title, note }),
          ...rest,
          ...(isHome ? { mockup, trustPoints } : { visual: visualField }),
        } as Fields<AnyProps>;
      },
      defaultProps: {
        variant: "page",
        tag: "",
        title: L("Headline for this page", "Judul utama halaman ini"),
        description: L("Supporting sentence that explains the value.", "Kalimat pendukung yang menjelaskan nilainya."),
        buttons: [],
        visual: defaultVisual("panel"),
      },
    }),

    featureBand: section("featureBand", {
      label: L("Phone band", "Pita HP"),
      fields: {
        anchor: anchor(),
        screen: select("Phone screen", "Layar HP", [
          ["faceScan", "Face clock-in (animated scan)", "Absen wajah (pemindaian beranimasi)"],
          ["approval", "Approvals (checks in order)", "Approval (centang berurutan)"],
        ]),
        tag: tag(),
        header: header(),
        buttons: buttons(1),
        tint: tint(),
        accessory: select("Floating badge", "Lencana melayang", ACCESSORIES),
        screenTitle: text("Screen title", "Judul layar"),
        screenSubtitle: text("Screen date / subtitle", "Tanggal / anak judul layar"),
        chips: textList("Result chips", "Chip hasil absen", 4),
        screenButton: text("Screen button", "Tombol di layar"),
        pendingLabel: plain("Pending label", "Label menunggu"),
        doneLabel: plain("Done label", "Label disetujui"),
        items: list(
          "Approval rows",
          "Baris persetujuan",
          { name: plain("Name", "Nama"), detail: text("Request", "Pengajuan") },
          "name",
          { name: L("Name", "Nama"), detail: "" },
          5,
        ),
      },
      resolveFields: (item, { fields }) => {
        const { chips, screenButton, pendingLabel, doneLabel, items, ...rest } = fields as Fields<AnyProps>;
        return {
          ...rest,
          ...(item.props.screen === "faceScan" ? { chips, screenButton } : { pendingLabel, doneLabel, items }),
        } as Fields<AnyProps>;
      },
      defaultProps: { screen: "faceScan", tint: "sky", accessory: "shield", header: headerDefaults, buttons: [], chips: [], items: [] },
    }),

    requestsBoard: section("requestsBoard", {
      label: L("Requests board", "Papan pengajuan"),
      fields: {
        anchor: anchor(),
        tag: tag(),
        header: header(),
        buttons: buttons(1),
        cards: list(
          "Request cards",
          "Kartu pengajuan",
          { title: text("Type", "Jenis"), subtitle: text("Detail", "Rincian"), status: plain("Status", "Status") },
          "title",
          { title: L("Request", "Pengajuan"), subtitle: "", status: "" },
          6,
        ),
        doneLabel: plain("Status that counts as done", "Status yang dianggap selesai"),
        stripTitle: text("Strip title", "Judul baris ringkasan"),
        stripItems: textList("Strip items", "Baris ringkasan", 6),
      },
      defaultProps: { header: headerDefaults, buttons: [], cards: [], stripItems: [] },
    }),

    modulesMap: section("modulesMap", {
      label: L("Features map", "Peta fitur"),
      fields: {
        anchor: anchor(),
        tag: tag(),
        header: header(),
        tint: tint(),
        features: featuresField("Features (empty = all)", "Fitur (kosong = semua)"),
      },
      defaultProps: { header: headerDefaults, tint: "sky", features: [] },
    }),

    industries: section("industries", {
      label: L("Industry solutions", "Solusi industri"),
      fields: {
        anchor: anchor(),
        tag: tag(),
        header: header(),
        solutions: solutionsField("Solutions (empty = those shown on home)", "Solusi (kosong = yang tampil di beranda)"),
      },
      defaultProps: { header: headerDefaults, solutions: [] },
    }),

    testimonials: section("testimonials", {
      label: L("Testimonials", "Testimoni"),
      fields: {
        anchor: anchor(),
        tag: tag(),
        header: header(),
        items: list(
          "Testimonials (real ones only)",
          "Testimoni (hanya yang asli)",
          {
            quote: textarea("Quote", "Kutipan"),
            name: plain("Name", "Nama"),
            role: text("Role", "Jabatan"),
            tone: select("Colour", "Warna", [
              ["yellow", "Yellow", "Kuning"],
              ["cyan", "Teal", "Tosca"],
              ["pink", "Pink", "Pink"],
            ]),
            rotationDeg: number("Tilt (degrees)", "Kemiringan (derajat)"),
          },
          "name",
          { quote: "", name: L("Name", "Nama"), role: "", tone: "yellow", rotationDeg: 0 },
          3,
        ),
      },
      defaultProps: { header: headerDefaults, items: [] },
    }),

    pricing: section("pricing", {
      label: L("Pricing plans", "Paket harga"),
      fields: {
        anchor: anchor(),
        variant: select("Variant", "Varian", [
          ["full", "Full — every feature per plan", "Lengkap — semua fitur per paket"],
          ["compact", "Compact — a few features + link", "Ringkas — beberapa fitur + tautan"],
        ]),
        tag: tag(),
        header: header(),
        tint: tint(),
        plans: list(
          "Plans",
          "Paket",
          {
            name: text("Name", "Nama paket"),
            badge: text("Label", "Label"),
            isFeatured: toggle("Highlight this plan", "Sorot paket ini"),
            pricePrefix: text("Price prefix", "Awalan harga"),
            price: text("Price", "Harga"),
            priceUnit: text("Unit", "Satuan"),
            description: text("Short description", "Keterangan singkat"),
            inheritsFrom: text("Inherits line", "Baris pewarisan"),
            features: list(
              "Features in the plan",
              "Fitur dalam paket",
              { text: text("Feature", "Fitur"), isSoon: toggle("Coming soon", "Segera hadir") },
              "text",
              { text: L("Feature", "Fitur"), isSoon: false },
            ),
            actionLabel: plain("Button label", "Teks tombol"),
            actionHref: link("Button link", "Link tombol"),
          },
          "name",
          { name: L("Plan", "Paket"), price: "", pricePrefix: L("From", "Mulai dari"), priceUnit: "/bulan/karyawan", features: [], actionLabel: L("Contact sales", "Hubungi sales"), actionHref: "/demo", isFeatured: false },
          4,
        ),
        showEstimator: toggle("Show employee-count estimator", "Tampilkan hitung jumlah karyawan"),
        estimatorTitle: plain("Estimator title", "Judul hitung karyawan"),
        estimatorDescription: plain("Estimator description", "Keterangan hitung karyawan"),
        matrix: list(
          "Feature comparison table",
          "Tabel perbandingan fitur",
          {
            title: plain("Category", "Kategori"),
            groups: list(
              "Features",
              "Fitur",
              {
                title: plain("Feature", "Fitur"),
                isSoon: toggle("Coming soon", "Segera hadir"),
                points: list("Points", "Poin", { text: plain("Point", "Poin") }, "text", { text: L("Point", "Poin") }),
                cells: list(
                  "Per plan (same order as the plans)",
                  "Isi per paket (urutan sama dengan paket)",
                  {
                    mode: select("Value", "Nilai", [
                      ["included", "Included", "Termasuk"],
                      ["excluded", "Not included", "Tidak termasuk"],
                      ["addon", "Paid add-on", "Tambahan berbayar"],
                    ]),
                    label: plain("Label (add-on)", "Label (tambahan)"),
                  },
                  "mode",
                  { mode: "included", label: "" },
                  4,
                ),
              },
              "title",
              { title: L("Feature", "Fitur"), isSoon: false, points: [], cells: [] },
            ),
          },
          "title",
          { title: L("Category", "Kategori"), groups: [] },
        ),
        addonNote: text("Add-on note", "Catatan tambahan fitur"),
        points: textList("Offer points (compact)", "Poin penawaran (ringkas)", 5),
        buttons: buttons(1),
      },
      defaultProps: { variant: "full", header: headerDefaults, tint: "white", plans: [], points: [], buttons: [] },
    }),

    faq: section("faq", {
      label: "FAQ",
      fields: {
        anchor: anchor(),
        tag: tag(),
        header: header(),
        items: list(
          "Questions",
          "Pertanyaan",
          { question: text("Question", "Pertanyaan"), answer: textarea("Answer", "Jawaban") },
          "question",
          { question: L("New question", "Pertanyaan baru"), answer: "" },
          20,
        ),
      },
      defaultProps: { header: headerDefaults, items: [] },
    }),

    cta: section("cta", {
      label: L("Closing call to action", "Ajakan penutup"),
      fields: { header: header(), buttons: buttons(1), guarantees: textList("Guarantees", "Jaminan demo", 4) },
      defaultProps: { header: headerDefaults, buttons: [], guarantees: [] },
    }),

    section: section("section", {
      label: L("Section with image", "Bagian dengan gambar"),
      fields: {
        anchor: anchor(),
        tag: tag(),
        header: header(),
        tint: tint(),
        visualSide: select("Image side", "Sisi gambar", [
          ["right", "Right", "Kanan"],
          ["left", "Left", "Kiri"],
        ]),
        visual: visual(),
        columns: select("Columns", "Kolom", [
          ["2", "2", "2"],
          ["3", "3", "3"],
          ["4", "4", "4"],
        ]),
        items: list(
          "Cards",
          "Kartu",
          {
            title: text("Title", "Judul"),
            description: textarea("Description", "Deskripsi"),
            badge: text("Label", "Label"),
            href: link("Link (optional)", "Link (opsional)"),
          },
          "title",
          { title: L("Card", "Kartu"), description: "" },
          12,
        ),
      },
      defaultProps: { header: headerDefaults, tint: "white", visualSide: "right", visual: defaultVisual("panel"), columns: "3", items: [] },
    }),

    featureCatalog: section("featureCatalog", {
      label: L("Features catalog (automatic)", "Katalog fitur (otomatis)"),
      fields: { tag: tag() },
      defaultProps: {},
    }),

    solutionCatalog: section("solutionCatalog", {
      label: L("Solutions catalog (automatic)", "Katalog solusi (otomatis)"),
      fields: { tag: tag() },
      defaultProps: {},
    }),

    toolsList: section("toolsList", {
      label: L("Calculators list", "Daftar kalkulator"),
      fields: { anchor: anchor(), tag: tag(), header: header() },
      defaultProps: { header: headerDefaults },
    }),

    contactForm: section("contactForm", {
      label: L("Demo request form", "Formulir demo"),
      fields: {
        anchor: anchor(),
        tag: tag(),
        header: header(),
        visual: visual(),
        submitLabel: plain("Submit label", "Teks tombol kirim"),
        successTitle: text("Success title", "Judul berhasil"),
        successMessage: text("Success message", "Pesan berhasil"),
        employeeCountOptions: tags("Employee count options", "Pilihan jumlah karyawan"),
        industryOptions: tags("Industry options", "Pilihan jenis usaha"),
      },
      defaultProps: {
        header: headerDefaults,
        visual: defaultVisual("panel"),
        submitLabel: L("Send request", "Kirim pengajuan"),
        successTitle: L("Thank you. We will contact you soon.", "Terima kasih. Kami hubungi segera."),
        successMessage: "",
        employeeCountOptions: [],
        industryOptions: [],
      },
    }),

    textSections: section("textSections", {
      label: L("Long text (legal pages)", "Teks panjang (halaman hukum)"),
      fields: {
        sections: list(
          "Sections",
          "Bagian",
          { heading: text("Heading", "Judul"), body: { type: "textarea", label: L("Body (blank line = new paragraph, '- ' = list)", "Isi (baris kosong = paragraf baru, '- ' = daftar)") } },
          "heading",
          { heading: L("Heading", "Judul"), body: "" },
          40,
        ),
      },
      defaultProps: { sections: [] },
    }),

    featureGrid: section("featureGrid", {
      label: L("Feature cards", "Kartu fitur"),
      fields: {
        tag: tag(),
        header: header(),
        tint: tint(),
        columns: select("Columns", "Kolom", [
          ["2", "2", "2"],
          ["3", "3", "3"],
          ["4", "4", "4"],
        ]),
        items: list(
          "Cards",
          "Kartu",
          {
            title: text("Title", "Judul"),
            description: textarea("Description", "Deskripsi"),
            badge: text("Label", "Label"),
            href: link("Link (optional)", "Link (opsional)"),
          },
          "title",
          { title: L("Card", "Kartu"), description: "" },
          8,
        ),
      },
      defaultProps: { header: headerDefaults, tint: "white", columns: "3", items: [] },
    }),

    promoBento: section("promoBento", {
      label: L("Promo (bento cards)", "Promo (kartu bento)"),
      fields: {
        highlight: plain("Highlighted words", "Kata berwarna di awal judul"),
        header: header(),
        tint: tint(),
        cards: list(
          "Cards",
          "Kartu",
          {
            title: text("Title", "Judul"),
            description: textarea("Description", "Deskripsi"),
            icon: select("Icon", "Ikon", [
              ["headset", "Headset", "Headset"],
              ["cloudDownload", "Cloud download", "Unduh awan"],
              ["wrench", "Wrench", "Kunci pas"],
              ["settings", "Settings", "Pengaturan"],
              ["rocket", "Rocket", "Roket"],
              ["users", "People", "Orang"],
              ["message", "Chat", "Percakapan"],
              ["calendar", "Calendar", "Kalender"],
              ["shield", "Shield", "Perisai"],
              ["sparkles", "Sparkles", "Kilau"],
            ]),
            tone: select("Color", "Warna", [
              ["lavender", "Lavender", "Lavender"],
              ["yellow", "Yellow", "Kuning"],
              ["sky", "Sky", "Biru muda"],
              ["peach", "Peach", "Peach"],
              ["cyan", "Teal", "Tosca"],
            ]),
            size: select("Size", "Ukuran", [
              ["normal", "Normal", "Biasa"],
              ["wide", "Wide", "Lebar"],
              ["tall", "Tall", "Tinggi"],
            ]),
          },
          "title",
          { title: L("Card", "Kartu"), description: "", icon: "sparkles", tone: "lavender", size: "normal" },
          9,
        ),
      },
      defaultProps: { header: headerDefaults, tint: "white", cards: [] },
    }),

    workflow: section("workflow", {
      label: L("Workflow steps", "Langkah berurutan"),
      fields: {
        tag: tag(),
        header: header(),
        steps: list(
          "Steps",
          "Langkah",
          { title: text("Title", "Judul"), description: textarea("Description", "Deskripsi") },
          "title",
          { title: L("Step", "Langkah"), description: "" },
          8,
        ),
      },
      defaultProps: { header: headerDefaults, steps: [] },
    }),

    partners: section("partners", {
      label: L("Partner logos", "Logo partner"),
      fields: {
        header: header(),
        rowOne: partnersField("Row 1", "Baris 1"),
        rowTwo: partnersField("Row 2", "Baris 2"),
        showTooltip: toggle("Show the partner name on hover", "Tampilkan nama partner saat di-hover"),
      },
      defaultProps: { header: headerDefaults, rowOne: [], rowTwo: [], showTooltip: false },
    }),
  };
}
