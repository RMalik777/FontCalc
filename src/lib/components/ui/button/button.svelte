<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { merge } from '$lib/utils/class-merge';
	import { type VariantProps } from 'cva';

	import { buttonVariant } from '$lib/components/ui/button/buttonVariant';

	interface Props extends VariantProps<typeof buttonVariant>, HTMLButtonAttributes {}

	let { children, variant, size, square, class: className, ...props }: Props = $props();
</script>

<button class={merge(buttonVariant({ variant, size, square }), className)} {...props}>
	{@render children?.()}
</button>
