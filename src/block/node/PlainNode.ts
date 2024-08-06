import { createNodeParser } from "./creator";

import type { NodeCreator } from "./creator";
import type { NodeParser } from "./index";
import type { PlainNode } from "./type";

export const createPlainNode: NodeCreator<PlainNode> = (raw) => [
	{
		type: "plain",
		raw,
		text: raw,
	},
];

export const PlainNodeParser: NodeParser = createNodeParser(createPlainNode, {
	parseOnNested: true,
	parseOnQuoted: true,
	patterns: [/^()(.*)()$/],
});
