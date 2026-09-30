<script lang="ts">
	import { codeToHtml, type ThemeRegistration } from "shiki";
	import { toast } from "svelte-sonner";

	import Check from "@lucide/svelte/icons/check";
	import Copy from "@lucide/svelte/icons/copy";

	import { Button } from "$lib/components/ui/button";

	import { getScale } from "$lib/scale.svelte";

	const scale = getScale();

	// Token colors point at CSS variables so the code follows the light and dark themes.
	const theme: ThemeRegistration = {
		name: "proof",
		type: "light",
		colors: { "editor.foreground": "var(--code-text)", "editor.background": "transparent" },
		tokenColors: [
			{
				scope: ["entity.name.tag", "entity.other.attribute-name", "meta.selector"],
				settings: { foreground: "var(--code-selector)" },
			},
			{
				scope: ["support.type.property-name", "variable", "support.type.custom-property"],
				settings: { foreground: "var(--code-text)" },
			},
			{
				scope: ["constant.numeric", "keyword.other.unit"],
				settings: { foreground: "var(--code-number)" },
			},
			{ scope: ["punctuation", "comment"], settings: { foreground: "var(--code-muted)" } },
		],
	};

	const code = $derived.by(() => {
		if (scale.naming === "html") {
			return scale.steps
				.map((s) => `${s.name} {\n\tfont-size: ${s.value}${scale.unit};\n}`)
				.join("\n\n");
		}
		// Utopia-style names: --step-2, --step-0, --step--1.
		const props = scale.steps.map((s) => `\t--step-${s.name}: ${s.value}${scale.unit};`);
		return `:root {\n${props.join("\n")}\n}`;
	});

	let html = $state("");
	let copied = $state(false);
	let copied_timer: ReturnType<typeof setTimeout> | undefined;

	$effect(() => {
		const source = code;
		let stale = false;
		codeToHtml(source, { lang: "css", theme }).then((result) => {
			if (!stale) html = result;
		});
		return () => {
			stale = true;
		};
	});

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			clearTimeout(copied_timer);
			copied_timer = setTimeout(() => (copied = false), 1600);
			toast.success("CSS copied to clipboard!");
		} catch {
			toast.error("Couldn't copy the CSS. Select the code and copy it manually.");
		}
	}
</script>

{#if scale.valid}
	<section aria-labelledby="css-heading" class="flex max-w-3xl flex-col gap-4">
		<div class="flex flex-wrap items-end justify-between gap-3">
			<div class="flex flex-col gap-1">
				<h2 id="css-heading" class="text-xl font-semibold tracking-tight">CSS</h2>
				<p class="text-sm text-muted-foreground">
					{scale.naming === "html"
						? "A font-size rule for each element."
						: "A custom property for each step."}
				</p>
			</div>
			<Button variant="outline" onclick={copy} aria-live="polite">
				{#if copied}
					<Check data-icon="inline-start" />
					Copied
				{:else}
					<Copy data-icon="inline-start" />
					Copy CSS
				{/if}
			</Button>
		</div>

		<div class="code rounded-lg border border-border bg-card">
			{#if html}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html html}
			{:else}
				<pre><code>{code}</code></pre>
			{/if}
		</div>
	</section>
{/if}

<style>
	.code :global(pre) {
		overflow-x: auto;
		padding: 1rem 1.25rem;
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		line-height: 1.7;
		tab-size: 2;
		color: var(--code-text);
		background: transparent !important;
	}
</style>
