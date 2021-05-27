import { App, MarkdownPostProcessorContext, TFile, BlockCache, LinkCache, EmbedCache, MetadataCache, CachedMetadata, WorkspaceLeaf, View } from "obsidian"

declare module "obsidian" {
  interface View {
    file: TFile
    previewMode: {renderer: {sections: { lineStart: number; lineEnd: number; el: HTMLElement; }[]}}
  }
}

export interface AddBlockReferences {
  app: App
  ctx: MarkdownPostProcessorContext | { sourcePath: string, getSectionInfo: (val: HTMLElement) => void }
  val: HTMLElement
  mdCache: CachedMetadata
  listSections: any
  actView: View
}

export interface CreateButtonElement {
  app: App
  blockRefs: IndexItem
  val: HTMLElement
}

export interface FileRef {
  file: TFile
  line: number
}

interface IndexItemReference {
  file: TFile
  line: number
}

interface IndexItem {
  count: number
  id: string
  file: TFile
  references: Set<IndexItemReference>
}

export interface Index {
  [id: string]: IndexItem
}

export interface EmbedOrLinkItem {
  id: string
  file: TFile
  pos: number
  page: string
}



interface PageItem {
  embeds: EmbedOrLinkItem[]
  links: EmbedOrLinkItem[]
}

export interface Pages {
  [id: string]: PageItem
}

export interface BuildIndexObjects {
  blocks: Record<string, BlockCache>
  links: LinkCache[]
  embeds: EmbedCache[]
  file: TFile
}