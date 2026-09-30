import { resolve } from "$app/paths";
import { queryOptions } from "@tanstack/svelte-query";

export type FontCategory = "serif" | "sans-serif" | "display" | "handwriting" | "monospace";

export interface FontStyle {
	weight: number;
	italic: boolean;
}

export interface GoogleFont {
	family: string;
	category: FontCategory;
	/** Small font file with only the glyphs of the family name, used to preview it in lists. */
	menu: string;
	/** The style to load and preview the family in. */
	style: FontStyle;
}

export const fontsQuery = queryOptions({
	queryKey: ["google-fonts", "popularity"],
	queryFn: async ({ signal }) => {
		// Created from the Google Fonts API at build time. See src/routes/fonts.json.
		const response = await fetch(resolve("/fonts.json"), { signal });
		if (!response.ok) throw new Error(`The font list returned ${response.status}.`);
		return (await response.json()) as GoogleFont[];
	},
	// The list only changes when the site is built, so fetch it once per visit.
	staleTime: Infinity,
	gcTime: Infinity,
});

const fallbacks: Record<FontCategory, string> = {
	serif: "serif",
	"sans-serif": "sans-serif",
	display: "sans-serif",
	handwriting: "cursive",
	monospace: "monospace",
};

export const categories: { value: FontCategory; label: string }[] = [
	{ value: "serif", label: "Serif" },
	{ value: "sans-serif", label: "Sans" },
	{ value: "display", label: "Display" },
	{ value: "handwriting", label: "Script" },
	{ value: "monospace", label: "Mono" },
];

/** Lowercase letters and digits only, so "Open Sans" and "opensans" compare equal. */
function compact(text: string) {
	return text.toLowerCase().replaceAll(/[^\p{L}\p{N}]/gu, "");
}

/**
 * True when every word of the query is in the family name, in any order.
 * Spaces and punctuation are ignored, so "opensans" and "garamond cormorant" match.
 */
export function matchesFamily(family: string, query: string) {
	const name = compact(family);
	return query
		.split(/\s+/)
		.map(compact)
		.every((word) => name.includes(word));
}

export function fontStack(family: string, category: FontCategory) {
	return `"${family}", ${fallbacks[category]}`;
}

/** Google Fonts CSS API URL that loads the family in its default style. */
export function stylesheetUrl(font: GoogleFont) {
	const { weight, italic } = font.style;
	const family = encodeURIComponent(font.family).replaceAll("%20", "+");
	let axes = "";
	if (italic) axes = `:ital,wght@1,${weight}`;
	else if (weight !== 400) axes = `:wght@${weight}`;
	return `https://fonts.googleapis.com/css2?family=${family}${axes}&display=swap`;
}

const menu_fonts = new Set<string>();

export function menuFamily(font: GoogleFont) {
	return `${font.family} menu`;
}

/** Registers the family's menu font. The browser downloads it the first time text uses it. */
export function registerMenuFont(font: GoogleFont) {
	if (menu_fonts.has(font.family)) return;
	menu_fonts.add(font.family);
	document.fonts.add(new FontFace(menuFamily(font), `url(${font.menu})`, { display: "swap" }));
}

const STORAGE_KEY = "fontcalc-typeface";

function isGoogleFont(value: unknown): value is GoogleFont {
	const font = value as GoogleFont | null;
	return (
		typeof font?.family === "string" &&
		typeof font.menu === "string" &&
		Object.hasOwn(fallbacks, font.category) &&
		typeof font.style?.weight === "number" &&
		typeof font.style.italic === "boolean"
	);
}

/** The typeface saved in this browser, or null. */
export function loadSavedTypeface(): GoogleFont | null {
	// Reading localStorage throws when the browser blocks site data.
	try {
		const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
		return isGoogleFont(saved) ? saved : null;
	} catch {
		return null;
	}
}

export function saveTypeface(font: GoogleFont | null) {
	try {
		if (font) localStorage.setItem(STORAGE_KEY, JSON.stringify(font));
		else localStorage.removeItem(STORAGE_KEY);
	} catch {
		// The choice is kept for this visit only.
	}
}
