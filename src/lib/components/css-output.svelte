<script lang="ts">
	import { siCss } from "simple-icons";
	import { toast } from "svelte-sonner";

	import * as CodeBlock from "#lib/components/ui/code-block/index.js";
	import { useHighlightedCode } from "#lib/hooks/use-highlighted-code.svelte.js";
	import { getScale } from "#lib/scale.svelte.js";

	const scale = getScale();

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

	const lines = useHighlightedCode(
		() => code,
		() => "css",
	);
</script>

{#if scale.valid}
	<section aria-labelledby="css-heading" class="flex max-w-3xl flex-col gap-4">
		<div class="flex flex-col gap-1">
			<h2 id="css-heading" class="text-xl font-semibold tracking-tight">CSS</h2>
			<p class="text-sm text-muted-foreground">
				{scale.naming === "html"
					? "A font-size rule for each element."
					: "A custom property for each step."}
			</p>
		</div>

		<CodeBlock.Root>
			<CodeBlock.Header>
				<CodeBlock.Title>
					<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d={siCss.path} />
					</svg>
					type-scale.css
				</CodeBlock.Title>
				<CodeBlock.Actions>
					<CodeBlock.CopyButton
						value={code}
						onclick={() => toast.success("CSS copied to clipboard!")}
					/>
				</CodeBlock.Actions>
			</CodeBlock.Header>
			<CodeBlock.Content lineNumbers class="tab-2">
				{#each lines.current as line, index (index)}
					<CodeBlock.Line code={line} />
				{/each}
			</CodeBlock.Content>
		</CodeBlock.Root>
	</section>
{/if}
