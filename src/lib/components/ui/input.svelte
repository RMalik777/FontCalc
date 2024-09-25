<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { merge } from '$lib/utils/class-merge';

	let { value = $bindable(), class: className, ...props }: HTMLInputAttributes = $props();
</script>

<input
	class={merge(
		'rounded-sm py-px px-1 font-medium disabled:bg-neutral-100 disabled:opacity-50',
		className
	)}
	bind:value
	{...props}
/>
