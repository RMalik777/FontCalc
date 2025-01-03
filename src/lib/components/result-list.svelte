<script lang="ts">
	import ResultChild from "./result-child.svelte";

	import { Plus, Minus } from "lucide-svelte";

	import { Button } from "$lib/components/ui/button/index";

	import * as Table from "$lib/components/ui/table/index";

	interface Props {
		base_size: number;
		constant: string;
		display: "px" | "rem";
		show_as: "Web" | "Print";
		visualize: boolean;
		rounding: boolean;
		rounding_to: number;
	}
	let { base_size, constant, display, show_as, visualize, rounding, rounding_to }: Props = $props();

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

	let show = $derived(show_as === "Print" ? print : web);
</script>

<section class="flex grow flex-col items-center">
	<div class="flex w-full flex-col items-start justify-center gap-2">
		<h2 class="text-xl font-semibold">Result</h2>
		<p>The base font size is <span class="font-bold">{base_size} px.</span></p>

		<div class="flex flex-col gap-1">
			<div class="flex grow flex-row gap-2">
				<Button
					variant={"outline"}
					disabled={show_as === "Web"}
					onclick={pushHead}
					size="sm"
					class="w-full text-xl font-bold"><Plus strokeWidth={3} /></Button
				>
				<Button
					variant={"outline"}
					disabled={show_as === "Web"}
					onclick={popHead}
					size="sm"
					class="w-full text-xl font-bold"><Minus strokeWidth={3} /></Button
				>
				<Button
					variant={"outline"}
					disabled={show_as === "Web"}
					size="sm"
					class="w-full font-semibold"
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
			</div>
			<Table.Root class="max-w-screen border">
				<Table.Header>
					<Table.Row class="divide-x text-base">
						<Table.Head class="font-bold">Level</Table.Head>
						<Table.Head class="font-bold">Size</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
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
				</Table.Body>
			</Table.Root>
			<div class="flex grow flex-row gap-2">
				<Button
					variant={"outline"}
					disabled={show_as === "Web"}
					onclick={pushTail}
					size="sm"
					class="w-full text-xl font-bold"><Plus strokeWidth={3} /></Button
				>
				<Button
					variant={"outline"}
					disabled={show_as === "Web"}
					onclick={popTail}
					size="sm"
					class="w-full text-xl font-bold"><Minus strokeWidth={3} /></Button
				>
			</div>
		</div>
	</div>
</section>
