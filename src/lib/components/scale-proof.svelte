<script lang="ts">
	import { prefersReducedMotion } from "svelte/motion";
	import { slide } from "svelte/transition";

	import Minus from "@lucide/svelte/icons/minus";
	import Plus from "@lucide/svelte/icons/plus";
	import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
	import TriangleAlert from "@lucide/svelte/icons/triangle-alert";

	import * as Alert from "$lib/components/ui/alert";
	import { Button } from "$lib/components/ui/button";

	import { fontStack, stylesheetUrl } from "$lib/fonts";
	import { getScale } from "$lib/scale.svelte";

	const scale = getScale();

	const largest_px = $derived(scale.steps.length ? scale.steps[0].px : 0);
	const smallest = $derived(scale.steps.at(-1));
	const largest = $derived(scale.steps.at(0));
	const numbered = $derived(scale.naming === "numbered");
	const duration = $derived(prefersReducedMotion.current ? 0 : 180);

	const typeface = $derived(scale.typeface);
</script>

<svelte:head>
	{#if typeface}
		<link rel="stylesheet" href={stylesheetUrl(typeface)} />
	{/if}
</svelte:head>

{#snippet edge(position: "top" | "bottom")}
	{@const top = position === "top"}
	<div class="flex flex-wrap items-center gap-2 py-3">
		<Button
			variant="outline"
			size="sm"
			onclick={() => (top ? scale.addLarger() : scale.addSmaller())}
		>
			<Plus data-icon="inline-start" />
			{top ? "Add larger step" : "Add smaller step"}
		</Button>
		<Button
			variant="outline"
			size="sm"
			disabled={scale.steps.length <= 1}
			onclick={() => (top ? scale.removeLarger() : scale.removeSmaller())}
		>
			<Minus data-icon="inline-start" />
			Remove <span class="font-mono">{top ? largest?.label : smallest?.label}</span>
		</Button>
		{#if top}
			<Button
				variant="outline"
				size="sm"
				class="ml-auto"
				disabled={!scale.steps_changed}
				onclick={() => scale.resetSteps()}
			>
				<RotateCcw data-icon="inline-start" />
				Reset steps
			</Button>
		{/if}
	</div>
{/snippet}

<section aria-labelledby="scale-heading" class="flex flex-col gap-6">
	<header class="flex max-w-prose flex-col gap-2">
		<h1 id="scale-heading" class="text-3xl font-semibold tracking-tight text-balance">
			Type scale
		</h1>
		{#if scale.valid && smallest && largest}
			<p class="text-muted-foreground">
				<span class="font-mono">{scale.steps.length}</span>
				{scale.steps.length === 1 ? "step" : "steps"} from
				<span class="font-mono font-semibold">{smallest.value}{scale.unit}</span> to
				<span class="font-mono font-semibold">{largest.value}{scale.unit}</span>, each
				<span class="font-mono font-semibold">{scale.ratio}</span> times the size of the step below.
			</p>
		{/if}
	</header>

	{#if !scale.valid}
		<Alert.Root variant="destructive" class="max-w-prose">
			<TriangleAlert />
			<Alert.Title>The scale can't be calculated</Alert.Title>
			<Alert.Description>
				{!scale.base_valid ? "Set a base size greater than 0." : "Set a ratio greater than 1."}
			</Alert.Description>
		</Alert.Root>
	{:else}
		<div>
			{#if numbered}
				{@render edge("top")}
			{/if}

			<ol class="border-t border-border">
				{#each scale.steps as step (step.level)}
					<li
						transition:slide={{ duration }}
						class="row grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 border-b border-border py-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-x-8"
						data-base={step.level === 0 || undefined}
					>
						<div class="flex flex-col gap-0.5 font-mono text-sm">
							<span class="font-semibold">
								{step.label}
								{#if step.level === 0}
									<span class="font-sans font-normal text-muted-foreground">base</span>
								{/if}
							</span>
							<span>
								{step.value}<span class="text-muted-foreground">{scale.unit}</span>
							</span>
						</div>

						{#if scale.actual_size}
							<div class="specimen" style:font-size="{step.px}px">
								<span class="guides" aria-hidden="true"></span>
								<span
									class="sample"
									style:font-family={typeface && fontStack(typeface.family, typeface.category)}
									style:font-weight={typeface?.style.weight}
									style:font-style={typeface?.style.italic ? "italic" : undefined}
								>
									{scale.sample || "Aa"}
								</span>
							</div>
						{:else}
							<div class="bar-track" aria-hidden="true">
								<div class="bar" style:width="{(step.px / largest_px) * 100}%"></div>
							</div>
						{/if}
					</li>
				{/each}
			</ol>

			{#if numbered}
				{@render edge("bottom")}
			{/if}
		</div>
	{/if}
</section>

<style>
	/*
	 * Guides and text share one grid cell and align on the baseline.
	 * The guides box has no text, so its baseline is its bottom edge: that
	 * edge sits on the sample's baseline and its top edge on the cap height.
	 */
	/* The size readout sits on the sample's baseline, like a proof annotation. */
	.row {
		align-items: last baseline;
	}
	.row:has(.bar-track) {
		align-items: center;
	}

	.specimen {
		display: grid;
		align-items: baseline;
		overflow: hidden;
		line-height: 1.15;
		padding-block: 0.1em;
		mask-image: linear-gradient(to right, #000 85%, transparent);
		transition: font-size 220ms cubic-bezier(0.2, 0, 0, 1);
	}
	.guides,
	.sample {
		grid-area: 1 / 1;
	}
	.guides {
		height: 1cap;
		border-bottom: 1px solid var(--guide);
		background: linear-gradient(var(--guide-muted), var(--guide-muted)) top / 100% 1px no-repeat;
	}
	.sample {
		position: relative;
		font-family: var(--font-serif);
		white-space: nowrap;
	}

	.bar-track {
		display: flex;
		align-items: center;
		height: 1.5rem;
		border-left: 1px solid var(--guide);
	}
	.bar {
		height: 0.5rem;
		min-width: 1px;
		background: var(--primary);
		transition: width 220ms cubic-bezier(0.2, 0, 0, 1);
	}
	[data-base] .bar {
		background: var(--foreground);
	}

	@media (prefers-reduced-motion: reduce) {
		.specimen,
		.bar {
			transition: none;
		}
	}
</style>
