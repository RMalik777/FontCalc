<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { merge } from "$lib/utils/class-merge";

	interface Props extends HTMLInputAttributes {
		checked?: boolean;
	}

	let { checked = $bindable(false), class: className, ...props }: Props = $props();
</script>

<input type="checkbox" class={merge("inline-block", className)} bind:checked {...props} />
