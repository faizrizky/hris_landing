import type { ComponentType } from "react";

import type { Page } from "@/types/cms";

import { ContactFormBlock } from "./ContactForm";
import { CtaBlock } from "./Cta";
import { FaqBlock } from "./Faq";
import { FeatureBandBlock } from "./FeatureBand";
import { FeatureCatalogBlock } from "./FeatureCatalog";
import { FeatureGridBlock } from "./FeatureGrid";
import { HeroBlock } from "./Hero";
import { IndustriesBlock } from "./Industries";
import { LayoutSectionBlock } from "./LayoutSection";
import { ElementView, type Element } from "./elements";
import { ModulesMapBlock } from "./ModulesMap";
import { PartnersBlock } from "./Partners";
import { PricingBlock } from "./Pricing";
import { RequestsBoardBlock } from "./RequestsBoard";
import { SectionBlock } from "./Section";
import { SolutionCatalogBlock } from "./SolutionCatalog";
import { TestimonialsBlock } from "./Testimonials";
import { TextSectionsBlock } from "./TextSections";
import { ToolsListBlock } from "./ToolsList";
import { WorkflowBlock } from "./Workflow";
import type { BlockContext } from "./types";

type Block = Page["layout"][number];
type BlockType = Block["blockType"];
type BlockComponent<T extends BlockType> = ComponentType<{
  block: Extract<Block, { blockType: T }>;
  ctx: BlockContext;
}>;

/** Elemen kecil yang diletakkan langsung di halaman. */
function ElementBlock({ block }: { block: { blockType: string } }) {
  return <ElementView element={block as Element} />;
}

/**
 * blockType → komponen. Bertipe, jadi menambah blok di CMS tanpa komponen di sini
 * gagal typecheck setelah `pnpm sync:types`.
 */
const components: { [T in BlockType]: BlockComponent<T> } = {
  hero: HeroBlock,
  featureBand: FeatureBandBlock,
  requestsBoard: RequestsBoardBlock,
  modulesMap: ModulesMapBlock,
  industries: IndustriesBlock,
  testimonials: TestimonialsBlock,
  pricing: PricingBlock,
  faq: FaqBlock,
  cta: CtaBlock,
  section: SectionBlock,
  featureCatalog: FeatureCatalogBlock,
  solutionCatalog: SolutionCatalogBlock,
  toolsList: ToolsListBlock,
  contactForm: ContactFormBlock,
  textSections: TextSectionsBlock,
  featureGrid: FeatureGridBlock,
  workflow: WorkflowBlock,
  partners: PartnersBlock,
  layoutSection: LayoutSectionBlock,
  badge: ElementBlock,
  heading: ElementBlock,
  paragraph: ElementBlock,
  image: ElementBlock,
  button: ElementBlock,
  card: ElementBlock,
  spacer: ElementBlock,
};

export const blockComponents = components;

export function RenderBlocks({ blocks, ctx }: { blocks: Page["layout"]; ctx: BlockContext }) {
  return (
    <>
      {blocks.map((block, index) => {
        const Component = components[block.blockType] as BlockComponent<typeof block.blockType> | undefined;

        if (!Component) return null;

        return <Component key={block.id ?? index} block={block} ctx={ctx} />;
      })}
    </>
  );
}
