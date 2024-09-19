<script lang="ts">
	import { calculate, PXtoREM } from '$lib/function/calculator';

	interface Props {
		label: string;
		level: number;
		base_size: number;
		constant: number;
		visualize: boolean;
		rounding: boolean;
		rounding_to: number;
		display: 'px' | 'rem';
	}
	let { label, level, base_size, constant, visualize, rounding, rounding_to, display }: Props =
		$props();

	let value = $derived(calculate(constant, level, base_size));
	let formatted_value = $derived.by(() => {
		let new_value: number = value;
		if (display === 'rem') new_value = PXtoREM(value, 16); // 16px is the default font size on typical browsers
		if (rounding) new_value = parseFloat(new_value.toFixed(rounding_to));
		return new_value;
	});
</script>

<tr class="border *:border">
	<td class="">{label}</td>
	<td class="" style:font-size={visualize ? `${formatted_value}${display}` : ''}>
		{formatted_value} {display}</td
	>
</tr>
