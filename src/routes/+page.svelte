<script lang="ts">
	import { untrack } from "svelte";
	import { Input } from "$lib/components/ui/input/index";
	import { Label } from "$lib/components/ui/label/index";
	import { Checkbox } from "$lib/components/ui/checkbox/index";
	import * as Select from "$lib/components/ui/select/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";

	import Result from "$lib/components/result-list.svelte";
	import Snippet from "$lib/components/snippet.svelte";

	let selected_option = $state("1.618");
	const option = [
		{
			value: "1.618",
			label: "Golden Ratio (1.618)",
		},
		{
			value: "2",
			label: "Double (2)",
		},
		{
			value: "Custom",
			label: "Custom",
		},
	];
	let show_as: "Web" | "Print" = $state("Print");
	let visualize = $state(false);
	let rounding = $state(true);
	let rounding_to = $state(1);

	// This is intentional, custom_option initial value need to be the same as selected_option initial value
	let custom_option: string | undefined = $state(untrack(() => selected_option));
	let constant = $derived(selected_option ?? custom_option);
	let base_size = $state(16);
	const display_option = [
		{ value: "px", label: "px" },
		{ value: "rem", label: "rem" },
	];
	let display: "px" | "rem" = $state("px");
</script>

<section
	class="mx-4 flex h-fit min-h-dvh flex-col items-start justify-start gap-3 sm:mx-8 md:mx-14 lg:mx-20"
>
	<h1 class="self-center text-center text-4xl font-semibold">Font Size Calculator</h1>
	<div class="flex w-full flex-row justify-between gap-4">
		<form class="w-fit space-x-1">
			<Label for="constant">Ratio</Label>
			<Select.Root
				type="single"
				bind:value={selected_option}
				onValueChange={() => (custom_option = selected_option)}
			>
				<Select.Trigger id="constant" class="">{selected_option}</Select.Trigger>
				<Select.Content>
					{#each option as { value, label }}
						<Select.Item {value}>{label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<Label for="custom">Custom Ratio</Label>
			<Input
				type="number"
				step="0.001"
				id="custom"
				name="constant"
				placeholder="Enter custom ratio"
				disabled={selected_option != "Custom"}
				bind:value={custom_option}
			/>
			<Label for="base">Font Base Size</Label>
			<Input
				type="number"
				id="base"
				name="base"
				placeholder="Enter the base font size (default is 16px)"
				bind:value={base_size}
			/>
			<Label for="display">Display Result As</Label>
			<Select.Root type="single" bind:value={display}>
				<Select.Trigger id="display">{display}</Select.Trigger>
				<Select.Content>
					{#each display_option as { value, label }}
						<Select.Item {value}>{label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>

			<Label for="showas">Show For</Label>
			<Select.Root type="single" bind:value={show_as}>
				<Select.Trigger id="showas">{show_as}</Select.Trigger>
				<Select.Content>
					<Select.Item value="Print">Print</Select.Item>
					<Select.Item value="Web">Web</Select.Item>
				</Select.Content>
			</Select.Root>

			<div>
				<Checkbox id="simulate" name="simulate" bind:checked={visualize} />
				<Label for="simulate" class="inline-block">Visualize Size</Label>
			</div>
			<div>
				<Checkbox id="rounding" name="rounding" bind:checked={rounding} />
				<Label for="rounding" class="inline-block">Rounding</Label>
			</div>
			<Label for="roundingTo">Fractional Digit</Label>
			<Input
				type="number"
				id="roundingTo"
				name="roundingTo"
				min="0"
				max="100"
				placeholder="The amount of number behind point"
				bind:value={rounding_to}
				disabled={!rounding}
				class="rounded-sm px-1 py-px"
			/>
		</form>
		<Separator orientation="vertical" />
		<Result {base_size} {constant} {display} {show_as} {visualize} {rounding} {rounding_to} />
	</div>

	<Snippet {base_size} />
</section>
