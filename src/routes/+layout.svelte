<script lang="ts">
	import "@fontsource/geist-mono";
	import "../app.css";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from "$lib/components/sidebar.svelte";

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

<Sidebar.Provider>
	<AppSidebar />
	<main>
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider>
