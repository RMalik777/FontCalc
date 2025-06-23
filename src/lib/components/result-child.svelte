<script lang="ts">
	import { calculate, PXtoREM } from "$lib/function/calculator";
	import * as Table from "$lib/components/ui/table/index.js";

	interface Props {
		label: string;
		level: number;
		base_size: number;
		constant: string;
		visualize: boolean;
		rounding: boolean;
		rounding_to: number;
		display: "px" | "rem";
	}
	let { label, level, base_size, constant, visualize, rounding, rounding_to, display }: Props =
		$props();

	let value = $derived(calculate(parseFloat(constant), level, base_size));
	let formatted_value = $derived.by(() => {
		let new_value: number = value;
		if (display === "rem") new_value = PXtoREM(value, 16); // 16px is the default font size on typical browsers
		if (rounding) new_value = parseFloat(new_value.toFixed(rounding_to));
		return new_value;
	});
</script>

<Table.Row class="divide-x">
	<Table.Cell>{label}</Table.Cell>
	<Table.Cell
		style="font-size: {visualize ? `${formatted_value}${display}` : ''};"
		class="font-mono font-normal tracking-tighter">{formatted_value} {display}</Table.Cell
	>
</Table.Row>
