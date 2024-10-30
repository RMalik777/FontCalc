<script lang="ts">
	import "@fontsource/geist-mono";
	import "../app.css";
</script>

<svelte:head>
	<title>Font Calculator</title>
	<meta
		name="description"
		content="A simple tool to calculate font sizes based on a modular scale."
	/>
	<link href="https://api.fontshare.com/v2/css?f[]=satoshi@1,2&display=swap" rel="stylesheet" />
	<script
		defer
		data-domain="raflimalik.com"
		src="https://plausible.io/js/script.file-downloads.hash.outbound-links.js"
	></script>
</svelte:head>

<slot />
