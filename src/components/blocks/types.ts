import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { Feature, Partner, SiteSetting, Solution } from "@/types/cms";

/** Data bersama yang dimuat server dan diberikan ke setiap blok (juga di dalam editor visual). */
export type SiteData = {
  partners: Partner[];
  features: Feature[];
  solutions: Solution[];
  settings: SiteSetting | null;
};

export type BlockContext = {
  locale: Locale;
  t: Dictionary;
  data: SiteData;
};
