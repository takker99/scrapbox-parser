import { createNodeParser } from "./creator.ts";

import type { FormulaNode } from "./type.ts";
import type { NodeCreator } from "./creator.ts";

const formulaWithTailHalfSpaceRegExp = /\[\$ .+? \]/;
const formulaRegExp = /\[\$ [^\]]+\]/;

const createFormulaNode: NodeCreator<FormulaNode> = (raw) => ({
  type: "formula",
  raw,
  formula: raw.substring(3, raw.length - (raw.endsWith(" ]") ? 2 : 1)),
});

export const FormulaNodeParser = createNodeParser(createFormulaNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [formulaWithTailHalfSpaceRegExp, formulaRegExp],
});
