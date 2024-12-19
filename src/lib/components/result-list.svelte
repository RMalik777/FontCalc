<script lang="ts">
	import ResultChild from "./result-child.svelte";

	import Button from "$lib/components/ui/button/button.svelte";
	import Input from "$lib/components/ui/input.svelte";
	import Label from "$lib/components/ui/label.svelte";
	import Checkbox from "$lib/components/ui/checkbox.svelte";

	interface Props {
		base_size: number;
		constant: number;
		display: "px" | "rem";
	}
	let { base_size, constant, display }: Props = $props();

	// Predefined values for web
	const web = [
		{ label: "H1", level: 6 },
		{ label: "H2", level: 5 },
		{ label: "H3", level: 4 },
		{ label: "H4", level: 3 },
		{ label: "H5", level: 2 },
		{ label: "H6", level: 1 },
		{ label: "p", level: 0 },
		{ label: "small", level: -1 },
	];

	// Predefined values to mirror WEB
	let print = $state([
		{ label: "6", level: 6 },
		{ label: "5", level: 5 },
		{ label: "4", level: 4 },
		{ label: "3", level: 3 },
		{ label: "2", level: 2 },
		{ label: "1", level: 1 },
		{ label: "Base", level: 0 },
		{ label: "-1", level: -1 },
	]);

	let show_as: "web" | "print" = $state("print");
	let visualize = $state(false);
	let rounding = $state(true);
	let rounding_to = $state(2);

	function pushHead() {
		if (print.length === 0) {
			print = [{ label: "Base", level: 0 }];
			return;
		}
		const first_item = print[0];
		const newItem = {
			label: first_item.level + 1 == 0 ? "Base" : `${first_item.level + 1}`,
			level: first_item.level + 1,
		};
		print.unshift(newItem);
	}
	function popHead() {
		print.shift();
	}
	function pushTail() {
		if (print.length === 0) {
			print = [{ label: "Base", level: 0 }];
			return;
		}
		const last_item = print[print.length - 1];
		const newItem = {
			label: last_item.level - 1 == 0 ? "Base" : `${last_item.level - 1}`,
			level: last_item.level - 1,
		};
		print.push(newItem);
	}
	function popTail() {
		print.pop();
	}

	let show = $derived(show_as === "print" ? print : web);
</script>

<section class="flex w-full flex-col items-center">
	<hr class="h-px w-full" />
	<h2 class="text-xl font-semibold">Result</h2>
	<p>The base font size is <span class="font-bold">{base_size} px.</span></p>
	<div class="flex w-full flex-col items-start justify-center gap-2">
		<form class="w-full">
			<Label for="showas">Show For</Label>
			<select
				id="showas"
				name="showas"
				placeholder="Select the displayed result format"
				bind:value={show_as}
				class="rounded-sm border border-neutral-300 px-1"
			>
				<option value="print">Print</option>
				<option value="web">Web</option>
			</select>
			<div>
				<Checkbox type="checkbox" id="simulate" name="simulate" bind:checked={visualize} />
				<Label for="simulate" class="inline-block">Visualize Size</Label>
			</div>
			<div>
				<Checkbox type="checkbox" id="rounding" name="rounding" bind:checked={rounding} />
				<Label for="rounding" class="inline-block">Rounding</Label>
			</div>
			<Label for="roundingTo">Fractional Digit</Label>
			<Input
				type="number"
				id="roundingTo"
				name="roundingTo"
				min="0"
				placeholder="The amount of number behind point"
				bind:value={rounding_to}
				class="rounded-sm px-1 py-px"
			/>
		</form>

		<div class="">
			<Button disabled={show_as === "web"} onclick={pushHead} size="xs" square>+</Button>
			<Button disabled={show_as === "web"} onclick={popHead} size="xs" square>-</Button>
			<Button
				disabled={show_as === "web"}
				size="xs"
				square={false}
				onclick={() =>
					(print = [
						{ label: "6", level: 6 },
						{ label: "5", level: 5 },
						{ label: "4", level: 4 },
						{ label: "3", level: 3 },
						{ label: "2", level: 2 },
						{ label: "1", level: 1 },
						{ label: "Base", level: 0 },
						{ label: "-1", level: -1 },
					])}>Reset</Button
			>
			<table class="table-auto">
				<thead class="border bg-neutral-100 font-semibold">
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
			<Button disabled={show_as === "web"} onclick={pushTail} size="xs" square>+</Button>
			<Button disabled={show_as === "web"} onclick={popTail} size="xs" square>-</Button>
		</div>
	</div>
</section>
