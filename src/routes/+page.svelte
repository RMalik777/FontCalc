<script lang="ts">
	import Result from '$lib/components/result-list.svelte';
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	let selected_option = $state(1.618);
	const option = [
		{
			value: 1.618,
			label: 'Golden Ratio (1.618)'
		},
		{
			value: 2,
			label: 'Double (2)'
		},
		{
			value: undefined,
			label: 'Custom'
		}
	];
	import { untrack } from 'svelte';

	// This is intentional, custom_option initial value need to be the same as selected_option initial value
	let custom_option: number | undefined = $state(untrack(() => selected_option));
	let constant = $derived(selected_option ?? custom_option);
	let base_size = $state(16);
	const display_option = [
		{ value: 'px', label: 'px' },
		{ value: 'rem', label: 'rem' }
	];
	let display: 'px' | 'rem' = $state('px');
</script>

<main
	class="mx-4 flex h-fit min-h-dvh flex-col items-center justify-start gap-3 sm:mx-8 md:mx-14 lg:mx-20"
>
	<h1 class="text-center text-4xl font-semibold">Font Size Calculator</h1>
	<form class="w-full space-x-1">
		<div>
			<Label for="constant">Ratio</Label>
			<select
				id="constant"
				name="constant"
				placeholder="Select the desired ratio to calculate the font size"
				bind:value={selected_option}
				onchange={() => (custom_option = selected_option)}
				class="block rounded-sm py-px"
			>
				{#each option as { value, label }}
					<option {value}>{label}</option>
				{/each}
			</select>
		</div>
		<div>
			<Label for="custom">Custom Ratio</Label>
			<Input
				type="number"
				step="0.001"
				id="custom"
				name="constant"
				placeholder="Enter custom ratio"
				disabled={selected_option != undefined}
				bind:value={custom_option}
			/>
		</div>
	</form>

	<form class="flex w-full flex-col items-start justify-start space-x-1">
		<Label for="base">Font Base Size</Label>
		<Input
			type="number"
			id="base"
			name="base"
			placeholder="Enter the base font size (default is 16px)"
			bind:value={base_size}
		/>
		<Label for="display">Display Result As</Label>
		<select
			id="display"
			name="display"
			placeholder="Select the units to display the output"
			bind:value={display}
			class="rounded-sm py-px font-medium"
		>
			{#each display_option as { value, label }}
				<option {value} class="font-medium">{label}</option>
			{/each}
		</select>
	</form>

	<Result {base_size} {constant} {display} />
</main>
