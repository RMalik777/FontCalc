import { browser } from "$app/environment";
import { QueryClient } from "@tanstack/svelte-query";

export const queryClient = new QueryClient({
	// Queries run only in the browser, not when the page is prerendered.
	defaultOptions: { queries: { enabled: browser } },
});
