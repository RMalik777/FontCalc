<script lang="ts">
	import { mode, toggleMode } from "mode-watcher";

	import Moon from "@lucide/svelte/icons/moon";
	import Sun from "@lucide/svelte/icons/sun";

	import { Button } from "$lib/components/ui/button";

	const dark = $derived(mode.current === "dark");
</script>

<Button
	variant="ghost"
	size="icon"
	onclick={toggleMode}
	aria-label={dark ? "Use light theme" : "Use dark theme"}
>
	{#if dark}
		<Sun />
	{:else}
		<Moon />
	{/if}
</Button>
