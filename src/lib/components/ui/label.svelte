<script lang="ts">
	import type { HTMLLabelAttributes } from "svelte/elements";
	import { merge } from "$lib/utils/class-merge";

	let { children, class: className, ...props }: HTMLLabelAttributes = $props();
</script>

<label class={merge("block font-medium", className)} {...props}>{@render children?.()}</label>
