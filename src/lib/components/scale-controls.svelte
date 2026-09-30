<script lang="ts">
	import RotateCcw from "@lucide/svelte/icons/rotate-ccw";

	import { Button } from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";
	import { Input } from "$lib/components/ui/input";
	import * as InputGroup from "$lib/components/ui/input-group";
	import * as Select from "$lib/components/ui/select";
	import { Separator } from "$lib/components/ui/separator";
	import { Switch } from "$lib/components/ui/switch";
	import * as ToggleGroup from "$lib/components/ui/toggle-group";

	import { namings, ratios, REM_BASE, units } from "$lib/constant/config";
	import { getScale, type Naming, type RatioPreset, type Unit } from "$lib/scale.svelte";

	// Controls render twice (desktop panel and mobile sheet), so ids must be unique.
	const uid = $props.id();
	const scale = getScale();

	const selected_ratio = $derived(ratios.find((r) => r.value === scale.ratio_preset));
</script>

<form class="flex flex-col gap-8" onsubmit={(e) => e.preventDefault()}>
	<Field.FieldGroup>
		<Field.Field>
			<Field.FieldLabel for="{uid}-ratio">Ratio</Field.FieldLabel>
			<Select.Root
				type="single"
				bind:value={() => scale.ratio_preset, (v) => scale.selectRatio(v as RatioPreset)}
				allowDeselect={false}
			>
				<Select.Trigger id="{uid}-ratio" class="w-full">
					<span class="flex flex-1 items-center gap-2">
						{selected_ratio?.label}
						{#if scale.ratio_preset !== "custom"}
							<span class="ml-auto font-mono text-muted-foreground">{scale.ratio_preset}</span>
						{/if}
					</span>
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each ratios as { value, label } (value)}
							<Select.Item {value} {label}>
								{label}
								{#if value !== "custom"}
									<span class="ml-auto font-mono text-muted-foreground">{value}</span>
								{/if}
							</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Field.FieldDescription
				>Each step is this many times larger than the one below.</Field.FieldDescription
			>
		</Field.Field>

		{#if scale.ratio_preset === "custom"}
			<Field.Field data-invalid={!scale.ratio_valid || undefined}>
				<Field.FieldLabel for="{uid}-custom">Custom ratio</Field.FieldLabel>
				<Input
					id="{uid}-custom"
					type="number"
					inputmode="decimal"
					step="0.001"
					min="1"
					class="font-mono"
					aria-invalid={!scale.ratio_valid || undefined}
					bind:value={scale.custom_ratio}
				/>
				{#if !scale.ratio_valid}
					<Field.FieldError>Enter a ratio greater than 1.</Field.FieldError>
				{/if}
			</Field.Field>
		{/if}

		<Field.Field data-invalid={!scale.base_valid || undefined}>
			<Field.FieldLabel for="{uid}-base">Base size</Field.FieldLabel>
			<InputGroup.Root>
				<InputGroup.Input
					id="{uid}-base"
					type="number"
					inputmode="decimal"
					min="1"
					class="font-mono"
					aria-invalid={!scale.base_valid || undefined}
					bind:value={scale.base_size}
				/>
				<InputGroup.Addon align="inline-end">
					<InputGroup.Text>px</InputGroup.Text>
				</InputGroup.Addon>
			</InputGroup.Root>
			{#if scale.base_valid}
				<Field.FieldDescription>The size of body text. Step 0 of the scale.</Field.FieldDescription>
			{:else}
				<Field.FieldError>Enter a size greater than 0.</Field.FieldError>
			{/if}
		</Field.Field>
	</Field.FieldGroup>

	<Field.FieldSeparator />

	<Field.FieldGroup>
		<Field.FieldSet>
			<Field.FieldLegend variant="label">Unit</Field.FieldLegend>
			<ToggleGroup.Root
				type="single"
				variant="outline"
				class="w-full"
				bind:value={() => scale.unit, (v) => v && (scale.unit = v as Unit)}
			>
				{#each units as { value, label } (value)}
					<ToggleGroup.Item {value} class="flex-1">{label}</ToggleGroup.Item>
				{/each}
			</ToggleGroup.Root>
			{#if scale.unit === "rem"}
				<Field.FieldDescription>Converted at {REM_BASE} px per rem.</Field.FieldDescription>
			{/if}
		</Field.FieldSet>

		<Field.FieldSet>
			<Field.FieldLegend variant="label">Step names</Field.FieldLegend>
			<ToggleGroup.Root
				type="single"
				variant="outline"
				class="w-full"
				bind:value={() => scale.naming, (v) => v && (scale.naming = v as Naming)}
			>
				{#each namings as { value, label } (value)}
					<ToggleGroup.Item {value} class="flex-1">{label}</ToggleGroup.Item>
				{/each}
			</ToggleGroup.Root>
			<Field.FieldDescription>
				{scale.naming === "numbered"
					? "Add or remove steps at either end of the scale."
					: "Fixed steps from small to h1."}
			</Field.FieldDescription>
		</Field.FieldSet>

		<Field.Field orientation="horizontal">
			<Field.FieldContent>
				<Field.FieldLabel for="{uid}-rounding">Round values</Field.FieldLabel>
				<Field.FieldDescription>Applies to the preview and the CSS.</Field.FieldDescription>
			</Field.FieldContent>
			<Switch id="{uid}-rounding" bind:checked={scale.rounding} />
		</Field.Field>

		<Field.Field data-disabled={!scale.rounding || undefined}>
			<Field.FieldLabel for="{uid}-digits">Decimal places</Field.FieldLabel>
			<Input
				id="{uid}-digits"
				type="number"
				inputmode="numeric"
				min="0"
				max="10"
				class="font-mono"
				disabled={!scale.rounding}
				bind:value={scale.digits}
			/>
		</Field.Field>
	</Field.FieldGroup>

	<Field.FieldSeparator />

	<Field.FieldGroup>
		<Field.Field orientation="horizontal">
			<Field.FieldContent>
				<Field.FieldLabel for="{uid}-actual">Preview at actual size</Field.FieldLabel>
				<Field.FieldDescription>Turn off to compare sizes as bars.</Field.FieldDescription>
			</Field.FieldContent>
			<Switch id="{uid}-actual" bind:checked={scale.actual_size} />
		</Field.Field>

		{#if scale.actual_size}
			<Field.Field data-disabled={!scale.actual_size || undefined}>
				<Field.FieldLabel for="{uid}-sample">Sample text</Field.FieldLabel>
				<Input id="{uid}-sample" disabled={!scale.actual_size} bind:value={scale.sample} />
			</Field.Field>
		{/if}
	</Field.FieldGroup>
	<Separator />
	<Button type="button" variant="outline" onclick={() => scale.reset()}>
		<RotateCcw data-icon="inline-start" />
		Reset to defaults
	</Button>
</form>
