<script lang="ts">
	import Result from '$lib/components/result_list.svelte';

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
	let custom_option: number | undefined = $state(selected_option);
	let constant = $derived(selected_option ?? custom_option);
	let base_size = $state(16);
	let display: 'px' | 'rem' = $state('px');
</script>

<main class="">
	<!-- <h1 class="text-center text-4xl font-semibold">Font Size Calculator</h1> -->
	<form class="flex flex-row items-center gap-2">
		<label for="constant">Ratio</label>
		<select
			id="constant"
			name="constant"
			placeholder="Select the desired ratio to calculate the font size"
			bind:value={selected_option}
			onchange={() => (custom_option = selected_option)}
			class="p-1"
		>
			{#each option as { value, label }}
				<option {value}>{label}</option>
			{/each}
		</select>
		<label for="custom">Custom Ratio</label>
		<input
			type="number"
			id="custom"
			name="constant"
			placeholder="Enter custom ratio"
			disabled={selected_option != undefined}
			bind:value={custom_option}
			class="p-1 disabled:opacity-50"
		/>
	</form>

	<form>
		<label for="base">Font Base Size</label>
		<input
			type="number"
			id="base"
			name="base"
			placeholder="Enter the base font size (default is 16px)"
			bind:value={base_size}
		/>
		<label for="display">Display Result As</label>
		<select
			id="display"
			name="display"
			placeholder="Select the units to display the output"
			bind:value={display}
		>
			<option value="px">px</option>
			<option value="rem">rem</option>
		</select>
	</form>

	<Result {base_size} {constant} {display} />
</main>
