<script lang="ts">
	import "@fontsource-variable/jetbrains-mono";
	import "../app.css";

	import { onMount, type Snippet } from "svelte";
	import { QueryClientProvider } from "@tanstack/svelte-query";
	import { Toaster } from "$lib/components/ui/sonner/index";
	import { ModeWatcher } from "mode-watcher";

	import { configure } from "onedollarstats";

	import { queryClient } from "$lib/query";

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		configure({ trackLocalhostAs: "font.raflimalik.com" });
	});
</script>

<svelte:head>
	<title>Font Calculator</title>
	<meta
		name="description"
		content="A simple tool to calculate font sizes based on a modular scale."
	/>
	<link rel="preconnect" href="https://api.fontshare.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://api.fontshare.com/v2/css?f[]=switzer@1,2&f[]=gambetta@1,2&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Toaster />
<ModeWatcher />
<QueryClientProvider client={queryClient}>
	{@render children?.()}
</QueryClientProvider>
