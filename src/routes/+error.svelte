<script lang="ts">
	import { page } from "$app/state";

	import { Button } from "#lib/components/ui/button/index.js";
</script>

<svelte:head>
	<title>{page.status} · Type Scale Calculator</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="flex min-h-dvh flex-col items-center justify-center gap-8 px-4 text-center">
	<div
		class="grid w-full max-w-xl items-baseline text-[clamp(6rem,22vw,12rem)] leading-none"
		aria-hidden="true"
	>
		<span class="col-start-1 row-start-1 h-[1cap] border-y border-t-guide-muted border-b-guide"
		></span>
		<span class="col-start-1 row-start-1 font-serif lining-nums">{page.status}</span>
	</div>
	<div class="flex max-w-prose flex-col gap-2">
		<h1 class="text-2xl font-semibold tracking-tight">{page.error?.message}</h1>
		<p class="text-muted-foreground">The page you asked for isn't part of the calculator.</p>
	</div>
	<Button href="/" variant="outline">Open the calculator</Button>
</main>
