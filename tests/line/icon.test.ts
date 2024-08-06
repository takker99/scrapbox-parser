import { describe, expect, it } from "vitest";
import { parse } from "../../src";

describe("icon", () => {
	it("Simple root icon", () => {
		expect(parse("[/icons/+1.icon]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Simple relative icon", () => {
		expect(parse("[me.icon]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Multiple icons", () => {
		expect(parse("[me.icon*3]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Icon and internal link on same line", () => {
		expect(
			parse("[Internal link][me.icon]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Each multiple icon must be different Object", () => {
		const [block] = parse("[me.icon*2]", { hasTitle: false });

		if (block === undefined || block.type !== "line") {
			throw new Error("fail");
		}

		expect(block.nodes.length).toBe(2);
		expect(block.nodes[0]).not.toBe(block.nodes[1]);
	});
});
