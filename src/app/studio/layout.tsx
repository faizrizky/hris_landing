import type { Metadata } from "next";

import { fontVariables } from "@/lib/fonts";
import "../(frontend)/globals.css";
import "./studio.css";

export const metadata: Metadata = {
  title: "HRIS Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${fontVariables} studio-body`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
