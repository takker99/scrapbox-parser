import { createNodeParser } from "./creator.ts";

import type { HelpfeelNode } from "./type.ts";
import type { NodeCreator } from "./creator.ts";

const helpfeelRegExp = /^\? .+$/;

const createHelpfeelNode: NodeCreator<HelpfeelNode> = (raw) => ({
  type: "helpfeel",
  raw,
  text: raw.substring(2),
});

export const HelpfeelNodeParser = createNodeParser(createHelpfeelNode, {
  parseOnNested: false,
  parseOnQuoted: false,
  patterns: [helpfeelRegExp],
});
