import { describe, it, expect, vi } from "vitest";

import {
	fontStack,
	loadSavedTypeface,
	matchesFamily,
	saveTypeface,
	stylesheetUrl,
	type FontStyle,
	type GoogleFont,
} from "$lib/fonts";

vi.mock("$env/static/private", () => ({ GOOGLE_FONT_API_KEY: "test" }));
const { defaultStyle } = await import("$lib/server/google-fonts");

function font(family: string, style: FontStyle): GoogleFont {
	return { family, category: "serif", menu: "", style };
}

describe("defaultStyle", () => {
	it("uses the regular style when the family has one", () => {
		expect(defaultStyle(["300", "regular", "700", "italic"])).toEqual({
			weight: 400,
			italic: false,
		});
	});

	it("uses the upright weight closest to 400 when there is no regular", () => {
		expect(defaultStyle(["300", "500", "700"])).toEqual({ weight: 300, italic: false });
		expect(defaultStyle(["700"])).toEqual({ weight: 700, italic: false });
	});

	it("uses italic when the family has only italic styles", () => {
		expect(defaultStyle(["italic"])).toEqual({ weight: 400, italic: true });
	});
});

describe("stylesheetUrl", () => {
	it("asks for weights and italics only when they are not the default", () => {
		expect(stylesheetUrl(font("Open Sans", { weight: 400, italic: false }))).toBe(
			"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap",
		);
		expect(stylesheetUrl(font("Sunflower", { weight: 300, italic: false }))).toContain(
			"family=Sunflower:wght@300&",
		);
		expect(stylesheetUrl(font("Molle", { weight: 400, italic: true }))).toContain(
			"family=Molle:ital,wght@1,400&",
		);
	});
});

describe("fontStack", () => {
	it("adds a generic fallback", () => {
		expect(fontStack("Caveat", "handwriting")).toBe('"Caveat", cursive');
	});
});

describe("matchesFamily", () => {
	it("ignores case, spaces and word order", () => {
		expect(matchesFamily("Open Sans", "opensans")).toBe(true);
		expect(matchesFamily("Cormorant Garamond", "garamond cormorant")).toBe(true);
		expect(matchesFamily("Source Serif 4", "  SOURCE  serif ")).toBe(true);
		expect(matchesFamily("Roboto", "")).toBe(true);
	});

	it("needs every word to match", () => {
		expect(matchesFamily("Roboto Slab", "roboto mono")).toBe(false);
	});
});

describe("saved typeface", () => {
	it("saves, restores and clears the typeface", () => {
		const store = new Map<string, string>();
		vi.stubGlobal("localStorage", {
			getItem: (key: string) => store.get(key) ?? null,
			setItem: (key: string, value: string) => store.set(key, value),
			removeItem: (key: string) => store.delete(key),
		});
		const inter = font("Inter", { weight: 400, italic: false });
		saveTypeface(inter);
		expect(loadSavedTypeface()).toEqual(inter);
		store.set("fontcalc-typeface", JSON.stringify({ family: "Inter", category: "toString" }));
		expect(loadSavedTypeface()).toBeNull();
		saveTypeface(null);
		expect(loadSavedTypeface()).toBeNull();
		vi.unstubAllGlobals();
	});
});
