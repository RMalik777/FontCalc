<script lang="ts">
	import { type ComponentProps, untrack } from "svelte";

	import { ALargeSmall } from "lucide-svelte";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { Input } from "$lib/components/ui/input/index";
	import { Label } from "$lib/components/ui/label/index";
	import { Checkbox } from "$lib/components/ui/checkbox/index";
	import * as Select from "$lib/components/ui/select/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import { Button } from "$lib/components/ui/button/index.js";

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
	const display_option = [
		{ value: "px", label: "px" },
		{ value: "rem", label: "rem" },
	];
	let {
		ref = $bindable(null),
		selected_option = $bindable("1.618"),
		custom_option = $bindable(undefined),
		show_as = $bindable("Web"),
		visualize = $bindable(false),
		rounding = $bindable(true),
		rounding_to = $bindable(1),
		display = $bindable("px"),
		base_size = $bindable(16),
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & {
		selected_option: (typeof option)[number]["value"];
		custom_option: string | undefined;
		show_as: "Web" | "Print";
		visualize: boolean;
		rounding: boolean;
		rounding_to: number;
		display: "px" | "rem";
		base_size: number;
	} = $props();
</script>

<Sidebar.Root variant="floating" collapsible="offcanvas" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="/" {...props}>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
							>
								<ALargeSmall class="size-5" />
							</div>
							<div class="flex flex-col gap-0.5 leading-none">
								<span class="font-bold">Font Size Calculator</span>
								<span>Configure</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<form>
			<Sidebar.Group>
				<Sidebar.GroupLabel>Calculate</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<div class="w-full space-y-2">
						<Label for="constant">Ratio</Label>
						<Select.Root
							type="single"
							bind:value={selected_option}
							onValueChange={() => (custom_option = selected_option)}
							allowDeselect={false}
						>
							<Select.Trigger id="constant">{selected_option}</Select.Trigger>
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
							defaultValue="16"
							bind:value={base_size}
						/>
					</div>
				</Sidebar.GroupContent>
			</Sidebar.Group>
			<Sidebar.Separator />
			<Sidebar.Group>
				<Sidebar.GroupLabel>Configuration</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<div class="w-full space-y-2">
						<Label for="display">Display Result As</Label>
						<Select.Root type="single" bind:value={display} allowDeselect={false}>
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
							defaultValue="1"
							placeholder="The amount of number behind point"
							bind:value={rounding_to}
							disabled={!rounding}
						/>
						<Button
							type="reset"
							variant="default"
							size="sm"
							class="w-full"
							onclick={() => {
								selected_option = "1.618";
								custom_option = "1.618";
								show_as = "Print";
								visualize = false;
								rounding = true;
								display = "px";
							}}>Reset</Button
						>
					</div>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</form>
	</Sidebar.Content>
</Sidebar.Root>
