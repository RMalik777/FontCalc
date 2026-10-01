import { SITE_URL } from "$lib/constant/config";

export const prerender = true;

export function GET() {
	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${SITE_URL}/</loc>
	</url>
</urlset>`,
		{ headers: { "Content-Type": "application/xml" } },
	);
}
