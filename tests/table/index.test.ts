/* eslint-disable no-tabs, no-irregular-whitespace */
import { describe, expect, it } from "vitest";
import { parse } from "../../src";

describe("Table", () => {
	it("Simple table", () => {
		expect(
			parse(
				`
table:hello
${"\t"}1${"\t"}2${"\t"}3
${"\t"}1 ${"\t"}2 ${"\t"}3
${"\t"}------${"\t"}------${"\t"}------
${"\t"}a${"\t"}b${"\t"}c
`.trim(),
				{ hasTitle: false },
			),
		).toMatchSnapshot();
	});

	it("Bulleted table", () => {
		expect(
			parse(
				` table:bulleted
 ${"\t"}1${"\t"}2${"\t"}3
 ${"\t"}1 ${"\t"}2 ${"\t"}3
 ${"\t"}------${"\t"}------${"\t"}------
 ${"\t"}a${"\t"}b${"\t"}c`,
				{ hasTitle: false },
			),
		).toMatchSnapshot();
	});

	it("Table with empty cells", () => {
		expect(
			parse(
				`table:${" "}
${"\t"} ${"\t"}　${"\t"}${"  "}
${"\t"}${"\t"}${"\t"}`,
				{ hasTitle: false },
			),
		).toMatchSnapshot();
	});

	it("Staggered table", () => {
		expect(
			parse(
				`table:Staggered
${"\t"}1${"\t"}2${"\t"}3${"\t"}4
${"\t"}1${"\t"}2${"\t"}3
${"\t"}1
${"\t"}1${"\t"}2
${"\t"}`,
				{ hasTitle: false },
			),
		).toMatchSnapshot();
	});

	it("Consecutive table", () => {
		expect(
			parse(
				`
table:hello
${"\t"}1${"\t"}2${"\t"}3
${"\t"}1 ${"\t"}2 ${"\t"}3
${"\t"}------${"\t"}------${"\t"}------
${"\t"}a${"\t"}b${"\t"}c
table:hello
${"\t"}1${"\t"}2${"\t"}3
${"\t"}1 ${"\t"}2 ${"\t"}3
${"\t"}------${"\t"}------${"\t"}------
${"\t"}a${"\t"}b${"\t"}c
`.trim(),
				{ hasTitle: false },
			),
		).toMatchSnapshot();
	});

	it("Node in table cells", () => {
		expect(
			parse(
				`
table:node in table cells
${"\t"}#hashtag
${"\t"}[* deco]
${"\t"}[ ]
${"\t"}\`code\`
${"\t"}https://external.com
${"\t"}[https://external.com]
${"\t"}[left https://external.com]
${"\t"}[https://external.com right]
${"\t"}[$ x]
${"\t"}[N35.6812362,E139.7649361]
${"\t"}#hashTag
${"\t"}? helpfeel
${"\t"}$ commandLine
${"\t"}[progfay.icon]
${"\t"}[https://image.com/image.png]
${"\t"}[link]
${"\t"}plain
${"\t"}> quote
${"\t"}[[progfay.icon]]
${"\t"}[[https://image.com/image.png]]
${"\t"}[[strong]]
`.trim(),
				{ hasTitle: false },
			),
		).toMatchSnapshot();
	});
});
