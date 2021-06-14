import { convertToNodes } from "./index.ts";
import { createNodeParser } from "./creator.ts";

import type { QuoteNode } from "./type.ts";
import type { NodeCreator } from "./creator.ts";

const quoteRegExp = /^>.*$/;

const createQuoteNode: NodeCreator<QuoteNode> = (raw, opts) => ({
  type: "quote",
  raw,
  nodes: convertToNodes(raw.substring(1), { ...opts, quoted: true }),
});

export const QuoteNodeParser = createNodeParser(createQuoteNode, {
  parseOnNested: false,
  parseOnQuoted: false,
  patterns: [quoteRegExp],
});
