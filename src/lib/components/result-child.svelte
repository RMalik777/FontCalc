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
		const rounding_value = rounding_to < 0 ? 0 : rounding_to;
		if (display === "rem") new_value = PXtoREM(value, 16); // 16px is the default font size on typical browsers
		if (rounding) new_value = parseFloat(new_value.toFixed(rounding_value));
		return new_value;
	});
</script>

<Table.Row class="divide-x font-mono tracking-tight">
	<Table.Cell>{label}</Table.Cell>
	<Table.Cell
		style="font-size: {visualize ? `${formatted_value}${display}` : ''};"
		class="font-normal"
	>
		{formatted_value} <span class="font-light text-muted-foreground">{display}</span>
	</Table.Cell>
</Table.Row>
