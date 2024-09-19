<script lang="ts">
	import ResultChild from './result_child.svelte';

	interface Props {
		base_size: number;
		constant: number;
		display: 'px' | 'rem';
	}
	let { base_size, constant, display }: Props = $props();

	// Predefined values for web
	const web = [
		{ label: 'H1', level: 6 },
		{ label: 'H2', level: 5 },
		{ label: 'H3', level: 4 },
		{ label: 'H4', level: 3 },
		{ label: 'H5', level: 2 },
		{ label: 'H6', level: 1 },
		{ label: 'p', level: 0 },
		{ label: 'small', level: -1 }
	];

	// Predefined values to mirror WEB
	let print = $state([
		{ label: '6', level: 6 },
		{ label: '5', level: 5 },
		{ label: '4', level: 4 },
		{ label: '3', level: 3 },
		{ label: '2', level: 2 },
		{ label: '1', level: 1 },
		{ label: 'Base', level: 0 },
		{ label: '-1', level: -1 }
	]);

	let show_as: 'web' | 'print' = $state('print');
	let visualize = $state(false);
	let rounding = $state(true);
	let rounding_to = $state(2);

	function pushHead() {
		if (print.length === 0) {
			print = [{ label: 'Base', level: 0 }];
			return;
		}
		const first_item = print[0];
		const newItem = {
			label: first_item.level + 1 == 0 ? 'Base' : `${first_item.level + 1}`,
			level: first_item.level + 1
		};
		print.unshift(newItem);
	}
	function popHead() {
		print.shift();
	}
	function pushTail() {
		if (print.length === 0) {
			print = [{ label: 'Base', level: 0 }];
			return;
		}
		const last_item = print[print.length - 1];
		const newItem = {
			label: last_item.level - 1 == 0 ? 'Base' : `${last_item.level - 1}`,
			level: last_item.level - 1
		};
		print.push(newItem);
	}
	function popTail() {
		print.pop();
	}

	let show = $derived(show_as === 'print' ? print : web);
</script>

<div>
	<h2>Result</h2>
	<p>The base font size is <span>{base_size} px.</span></p>

	<form>
		<label for="showas">Show For</label>
		<select
			id="showas"
			name="showas"
			placeholder="Select the displayed result format"
			bind:value={show_as}
		>
			<option value="print">Print</option>
			<option value="web">Web</option>
		</select>
	</form>

	<form>
		<label for="simulate">Visualize Size</label>
		<input type="checkbox" id="simulate" name="simulate" bind:checked={visualize} />
		<label for="rounding">Rounding</label>
		<input type="checkbox" id="rounding" name="rounding" bind:checked={rounding} />
		<label for="roundingTo">Number of Decimal</label>
		<input
			type="number"
			id="roundingTo"
			name="roundingTo"
			min="0"
			placeholder="The amount of number behind point"
			bind:value={rounding_to}
		/>
	</form>
	<button disabled={show_as === 'web'} onclick={pushHead}>+</button>
	<button disabled={show_as === 'web'} onclick={popHead}>-</button>
	<button
		disabled={show_as === 'web'}
		onclick={() =>
			(print = [
				{ label: '6', level: 6 },
				{ label: '5', level: 5 },
				{ label: '4', level: 4 },
				{ label: '3', level: 3 },
				{ label: '2', level: 2 },
				{ label: '1', level: 1 },
				{ label: 'Base', level: 0 },
				{ label: '-1', level: -1 }
			])}>Reset</button
	>
	<table class="table-auto">
		<thead class="border font-medium ">
			<tr class="*:border *:p-1">
				<th>Level</th>
				<th>Size</th>
			</tr>
		</thead>
		<tbody>
			{#each show as { label, level }}
				<ResultChild
					{label}
					{level}
					{base_size}
					{constant}
					{visualize}
					{rounding}
					{rounding_to}
					{display}
				/>
			{/each}
		</tbody>
	</table>
	<button disabled={show_as === 'web'} onclick={pushTail}>+</button>
	<button disabled={show_as === 'web'} onclick={popTail}>-</button>
</div>
