import { json } from "@sveltejs/kit";

import { fetchGoogleFonts } from "$lib/server/google-fonts";

// Build once, so the API key stays on the server and visitors get a static file.
export const prerender = true;

export async function GET({ fetch }) {
	return json(await fetchGoogleFonts(fetch));
}
