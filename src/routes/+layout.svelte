<script lang="ts">
	import "@fontsource-variable/jetbrains-mono";
	import "../app.css";

	import { Toaster } from "$lib/components/ui/sonner/index";
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>

<svelte:head>
	<title>Font Calculator</title>
	<meta
		name="description"
		content="A simple tool to calculate font sizes based on a modular scale."
	/>
	<link rel="preconnect" href="https://api.fontshare.com" />
	<link href="https://api.fontshare.com/v2/css?f[]=satoshi@1,2&display=swap" rel="stylesheet" />
</svelte:head>

<Toaster />
<ModeWatcher />
{@render children?.()}
