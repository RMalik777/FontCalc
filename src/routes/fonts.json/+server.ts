import { fetchGoogleFonts } from "#lib/server/google-fonts.js";

// Build once, so the API key stays on the server and visitors get a static file.
export const prerender = true;

export async function GET({ fetch }) {
	return Response.json(await fetchGoogleFonts(fetch));
}
