import { createNodeParser } from "./creator.ts";

import type { CodeNode } from "./type.ts";
import type { NodeCreator } from "./creator.ts";

const codeRegExp = /`.*?`/;

const createCodeNode: NodeCreator<CodeNode> = (raw) => ({
  type: "code",
  raw,
  text: raw.substring(1, raw.length - 1),
});

export const CodeNodeParser = createNodeParser(createCodeNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [codeRegExp],
});
