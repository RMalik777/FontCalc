<script lang="ts">
	import { resolve } from "$app/paths";

	import SlidersHorizontal from "@lucide/svelte/icons/sliders-horizontal";

	import { Button } from "$lib/components/ui/button";
	import * as Sheet from "$lib/components/ui/sheet";

	import CssOutput from "$lib/components/css-output.svelte";
	import ScaleControls from "$lib/components/scale-controls.svelte";
	import ScaleProof from "$lib/components/scale-proof.svelte";
	import ThemeToggle from "$lib/components/theme-toggle.svelte";

	import { Scale, setScale } from "$lib/scale.svelte";

	setScale(new Scale());
</script>

<div class="flex min-h-dvh flex-col">
	<header
		class="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/90 px-4 backdrop-blur sm:px-6"
	>
		<a href={resolve("/")} class="mr-auto flex items-center gap-2.5 rounded-md font-semibold">
			<span class="logo" aria-hidden="true">Aa</span>
			Font Calculator
		</a>

		<Sheet.Root>
			<Sheet.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline" class="lg:hidden">
						<SlidersHorizontal data-icon="inline-start" />
						Adjust scale
					</Button>
				{/snippet}
			</Sheet.Trigger>
			<Sheet.Content side="left" class="w-[min(22rem,90vw)] gap-0 overflow-y-auto">
				<Sheet.Header>
					<Sheet.Title>Adjust scale</Sheet.Title>
					<Sheet.Description>Changes apply as you type.</Sheet.Description>
				</Sheet.Header>
				<div class="px-4 pb-6">
					<ScaleControls />
				</div>
			</Sheet.Content>
		</Sheet.Root>

		<ThemeToggle />
	</header>

	<div class="flex-1 lg:grid lg:grid-cols-[20rem_minmax(0,1fr)]">
		<aside
			aria-label="Scale settings"
			class="hidden border-r border-border bg-card p-6 lg:sticky lg:top-14 lg:block lg:h-[calc(100dvh-3.5rem)] lg:overflow-y-auto"
		>
			<ScaleControls />
		</aside>

		<main class="flex min-w-0 flex-col gap-16 px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
			<ScaleProof />
			<CssOutput />
		</main>
	</div>
</div>

<style>
	/* Wordmark: serif pair set on a magenta baseline. */
	.logo {
		font-family: var(--font-serif);
		font-size: 1.375rem;
		line-height: 1;
		padding-bottom: 0.1rem;
		border-bottom: 2px solid var(--primary);
	}
</style>
