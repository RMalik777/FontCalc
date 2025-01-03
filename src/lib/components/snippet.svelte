<script lang="ts">
	import { onMount } from "svelte";
	import { codeToHtml } from "shiki";
	import { Clipboard } from "lucide-svelte";

	import { Button } from "$lib/components/ui/button/index";
	import * as Tooltip from "$lib/components/ui/tooltip/index";

	interface Props {
		base_size: number;
	}
	let { base_size = 16 }: Props = $props();
	const code = `:root {\n\tfont-size: ${base_size}px\n}`; // input code
	let html = $state("");
	onMount(async () => {
		html = await codeToHtml(code, {
			lang: "css",
			theme: "github-dark",
		});
	});
</script>

<div class="snippet">
	<div class="flex flex-row items-center justify-between rounded-t bg-black px-1 py-1 text-white">
		<h2 class="font-mono text-sm">code.css</h2>
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button
							{...props}
							class="rounded-xs group h-fit w-fit p-1.5"
							size="icon"
							variant="ghost"
							onclick={() => navigator.clipboard.writeText(code)}
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
