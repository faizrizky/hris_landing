"use client";

import type { ReactNode } from "react";

import { SiteFooter } from "@/features/site/components/site-footer";
import { SiteHeader } from "@/features/site/components/site-header";

import { meta } from "./metadata";

const DEFAULT_ACTION = { label: "Minta demo", href: "/demo" };

/** Kanvas di sekitar setiap editor: menu dan footer situs asli, dengan isi di antaranya. */
export function renderStudioRoot({ children, puck }: { children: ReactNode; puck: { metadata: unknown } }) {
  const { ctx, fontClass, chrome } = meta(puck);
  const settings = ctx.data.settings;
  const navigation = chrome.navigation;
  const navLinks = (navigation?.links ?? []).filter((link) => link.visible !== false);

  return (
    <div className={`${fontClass} min-h-screen bg-white font-sans antialiased`}>
      {settings && (
        <SiteHeader
          brandName={settings.siteName}
          action={navigation?.cta ?? DEFAULT_ACTION}
          featuresLabel={navigation?.featuresLabel ?? "Fitur"}
          solutionsLabel={navigation?.solutionsLabel ?? "Solusi"}
          navLinks={navLinks.map(({ label, href }) => ({ label, href }))}
          features={ctx.data.features}
          solutions={ctx.data.solutions}
        />
      )}
      <main>{children}</main>
      {settings && <SiteFooter settings={settings} footer={chrome.footer} />}
    </div>
  );
}
