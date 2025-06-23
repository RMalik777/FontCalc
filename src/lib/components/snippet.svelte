<script lang="ts">
	import { codeToHtml } from "shiki";

	import Clipboard from "lucide-svelte/icons/clipboard";

	import { Button } from "$lib/components/ui/button/index";
	import * as Tooltip from "$lib/components/ui/tooltip/index";
	import { toast } from "svelte-sonner";

	import { calculate, PXtoREM } from "$lib/function/calculator";

	interface Props {
		base_size: number;
		constant: string;
		rounding: boolean;
		rounding_to: number;
		display: "px" | "rem";
	}
	let { base_size = 16, constant = "1.618", rounding, rounding_to, display }: Props = $props();

	const level = [-1, 0, 1, 2, 3, 4, 5, 6];
	const size_list = $derived.by(() =>
		level.map((l) => {
			return {
				level: l === 0 ? "p" : l === -1 ? "small" : "h" + l.toString(),
				value: calculate(parseFloat(constant), l, base_size),
			};
		}),
	);
	const computedSnippet = $derived.by(() =>
		size_list
			.map((item) => {
				let new_value: number = item.value;
				const rounding_value = rounding_to < 0 ? 0 : rounding_to;
				if (display === "rem") new_value = PXtoREM(item.value, 16); // 16px is the default font size on typical browsers
				if (rounding) new_value = parseFloat(new_value.toFixed(rounding_value));
				if (rounding) return `${item.level} {\n\tfont-size: ${new_value}${display};\n}\n`;
			})
			.join(""),
	);
	const code = `:root {\n\tfont-size: ${base_size}px\n\n}\n${computedSnippet}`; // input code
	let html = $derived.by(
		async () =>
			await codeToHtml(code, {
				lang: "css",
				theme: "github-dark",
			}),
	);
</script>

<div class="snippet mt-10">
	<div class="flex flex-row items-center justify-between rounded-t bg-black px-1 py-1 text-white">
		<h2 class="font-mono text-sm">code.css</h2>
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button
							{...props}
							class="group h-fit w-fit rounded-xs p-1.5"
							size="icon"
							variant="ghost"
							onclick={() => {
								navigator.clipboard.writeText(code);
								toast.success("Copied to clipboard");
							}}
						>
							<Clipboard />
						</Button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Copy to clipboard</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</div>
	{#await html then html}
		<!-- eslint-disable-next-line svelte/no-at-html-tags-->
		{@html html}
	{/await}
</div>

<style>
	.snippet :global(pre) {
		padding: 0.25rem;
		padding-right: 1rem;
	}
</style>
