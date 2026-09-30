import { GOOGLE_FONT_API_KEY } from "$env/static/private";

import type { FontCategory, FontStyle, GoogleFont } from "$lib/fonts";

const API_URL = "https://www.googleapis.com/webfonts/v1/webfonts";

interface ApiFont {
	family: string;
	category: FontCategory;
	/** Styles such as "regular", "700" and "700italic". */
	variants: string[];
	menu: string;
}

/** The style to show a family in: upright and closest to 400, if the family has one. */
export function defaultStyle(variants: string[]): FontStyle {
	const styles = variants.map((variant) => ({
		// "regular" and "italic" have no number and are 400.
		weight: Number.parseInt(variant) || 400,
		italic: variant.endsWith("italic"),
	}));
	const upright = styles.filter((style) => !style.italic);
	const pool = upright.length ? upright : styles;
	const distance = (style: FontStyle) => Math.abs(style.weight - 400);
	return pool.reduce(
		(best, style) => (distance(style) < distance(best) ? style : best),
		pool[0] ?? { weight: 400, italic: false },
	);
}

/** Fetches every Google Fonts family, most popular first. */
export async function fetchGoogleFonts(fetch: typeof globalThis.fetch): Promise<GoogleFont[]> {
	const params = new URLSearchParams({
		key: GOOGLE_FONT_API_KEY,
		sort: "popularity",
		capability: "WOFF2",
		// Ask only for the fields we use. This makes the response about 4 times smaller.
		fields: "items(family,category,variants,menu)",
	});
	const response = await fetch(`${API_URL}?${params}`);
	const body = await response.json();
	if (!response.ok) {
		throw new Error(body?.error?.message ?? `Google Fonts returned ${response.status}.`);
	}
	return (
		(body.items as ApiFont[])
			// Icon fonts have no letters to preview a type scale with.
			.filter((font) => !/^Material (Icons|Symbols)/.test(font.family))
			.map(({ family, category, variants, menu }) => ({
				family,
				category,
				menu,
				style: defaultStyle(variants),
			}))
	);
}
