import { describe, it, expect } from "vitest";
import { Scale } from "$lib/scale.svelte";

describe("Scale", () => {
	it("lists numbered steps from largest to smallest", () => {
		const scale = new Scale();
		expect(scale.steps.map((s) => s.label)).toEqual([
			"+6",
			"+5",
			"+4",
			"+3",
			"+2",
			"+1",
			"0",
			"-1",
		]);
		expect(scale.steps.find((s) => s.level === 0)?.value).toBe(16);
		expect(scale.steps.find((s) => s.level === 1)?.value).toBe(25.9);
	});

	it("uses HTML element names", () => {
		const scale = new Scale();
		scale.naming = "html";
		expect(scale.steps.map((s) => s.name)).toEqual([
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"p",
			"small",
		]);
	});

	it("converts to rem and rounds", () => {
		const scale = new Scale();
		scale.unit = "rem";
		scale.digits = 3;
		expect(scale.format(25.888)).toBe(1.618);
		scale.rounding = false;
		expect(scale.format(20)).toBe(1.25);
	});

	it("adds and removes steps at both ends but keeps at least one", () => {
		const scale = new Scale();
		scale.addLarger();
		scale.addSmaller();
		expect(scale.steps.at(0)?.level).toBe(7);
		expect(scale.steps.at(-1)?.level).toBe(-2);
		for (let i = 0; i < 20; i++) scale.removeLarger();
		expect(scale.steps).toHaveLength(1);
		scale.resetSteps();
		expect(scale.steps).toHaveLength(8);
	});

	it("rejects ratios of 1 or less and empty base sizes", () => {
		const scale = new Scale();
		scale.selectRatio("custom");
		expect(scale.custom_ratio).toBe(1.618);
		scale.custom_ratio = 1;
		expect(scale.valid).toBe(false);
		expect(scale.steps).toEqual([]);
		scale.custom_ratio = 1.2;
		scale.base_size = null;
		expect(scale.valid).toBe(false);
	});

	it("starts a custom ratio from the preset in use", () => {
		const scale = new Scale();
		scale.selectRatio("1.25");
		scale.selectRatio("custom");
		expect(scale.custom_ratio).toBe(1.25);
	});
});
