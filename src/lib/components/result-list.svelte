<script lang="ts">
	import ResultChild from './result-child.svelte';

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

<section class="flex w-full flex-col items-center">
	<hr class="h-px w-full" />
	<h2 class="text-xl font-semibold">Result</h2>
	<p>The base font size is <span class="font-bold">{base_size} px.</span></p>
	<div class="flex w-full flex-col items-start justify-center gap-2 md:flex-row">
		<form class="w-full md:w-1/2">
			<label for="showas">Show For</label>
			<select
				id="showas"
				name="showas"
				placeholder="Select the displayed result format"
				bind:value={show_as}
				class="rounded-sm px-1 py-px"
			>
				<option value="print">Print</option>
				<option value="web">Web</option>
			</select>
			<div>
				<input
					type="checkbox"
					id="simulate"
					name="simulate"
					bind:checked={visualize}
					class="rounded-sm px-1 py-px"
				/>
				<label for="simulate">Visualize Size</label>
			</div>
			<div>
				<input
					type="checkbox"
					id="rounding"
					name="rounding"
					bind:checked={rounding}
					class="rounded-sm px-1 py-px"
				/>
				<label for="rounding">Rounding</label>
			</div>
			<label for="roundingTo">Fractional Digit</label>
			<input
				type="number"
				id="roundingTo"
				name="roundingTo"
				min="0"
				placeholder="The amount of number behind point"
				bind:value={rounding_to}
				class="rounded-sm px-1 py-px"
			/>
		</form>

		<div class="mx-auto">
			<button
				disabled={show_as === 'web'}
				onclick={pushHead}
				class="rounded border bg-neutral-100 px-2 py-1 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
				>+</button
			>
			<button
				disabled={show_as === 'web'}
				onclick={popHead}
				class="rounded border bg-neutral-100 px-2 py-1 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
				>-</button
			>
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
					])}
				class="rounded border bg-neutral-100 px-2 py-1 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
				>Reset</button
			>
			<table class="table-auto">
				<thead class="border bg-neutral-100 font-medium">
					<tr class="*:border *:p-2">
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
			<button
				disabled={show_as === 'web'}
				onclick={pushTail}
				class="rounded border bg-neutral-100 px-2 py-1 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
				>+</button
			>
			<button
				disabled={show_as === 'web'}
				onclick={popTail}
				class="rounded border bg-neutral-100 px-2 py-1 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
				>-</button
			>
		</div>
	</div>
</section>
