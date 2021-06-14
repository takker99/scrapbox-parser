import { createNodeParser } from "./creator.ts";

import type { BlankNode } from "./type.ts";
import type { NodeCreator } from "./creator.ts";

const blankRegExp = /\[\s+\]/;

const createBlankNode: NodeCreator<BlankNode> = (raw: string) => ({
  type: "blank",
  raw,
  text: raw.substring(1, raw.length - 1),
});

export const BlankNodeParser = createNodeParser(createBlankNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [blankRegExp],
});
