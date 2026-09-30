<script lang="ts">
	import { page } from "$app/state";

	import { Button } from "$lib/components/ui/button";
</script>

<main class="flex min-h-dvh flex-col items-center justify-center gap-8 px-4 text-center">
	<div class="status" aria-hidden="true">
		<span class="guides"></span>
		<span class="numeral">{page.status}</span>
	</div>
	<div class="flex max-w-prose flex-col gap-2">
		<h1 class="text-2xl font-semibold tracking-tight">{page.error?.message}</h1>
		<p class="text-muted-foreground">The page you asked for isn't part of the calculator.</p>
	</div>
	<Button href="/" variant="outline">Open the calculator</Button>
</main>

<style>
	.status {
		display: grid;
		align-items: baseline;
		width: min(36rem, 100%);
		font-size: clamp(6rem, 22vw, 12rem);
		line-height: 1;
	}
	.guides,
	.numeral {
		grid-area: 1 / 1;
	}
	.guides {
		height: 1cap;
		border-bottom: 1px solid var(--guide);
		background: linear-gradient(var(--guide-muted), var(--guide-muted)) top / 100% 1px no-repeat;
	}
	.numeral {
		font-family: var(--font-serif);
		font-variant-numeric: lining-nums;
	}
</style>
