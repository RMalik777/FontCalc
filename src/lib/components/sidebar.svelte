<script lang="ts">
	import { type ComponentProps } from "svelte";

	import ALargeSmall from "lucide-svelte/icons/a-large-small";

	import { Button } from "$lib/components/ui/button/index.js";
	import { Checkbox } from "$lib/components/ui/checkbox/index";
	import { Input } from "$lib/components/ui/input/index";
	import { Label } from "$lib/components/ui/label/index";
	import * as Select from "$lib/components/ui/select/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as RadioGroup from "$lib/components/ui/radio-group/index.js";

	import { option, display_option } from "$lib/constant/config";

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
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-violet-500 text-sidebar-primary-foreground dark:bg-violet-950"
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
					<div class="w-full space-y-2 px-2">
						<div class="flex w-full flex-col gap-1.5">
							<Label for="constant">Ratio</Label>
							<Select.Root
								type="single"
								bind:value={selected_option}
								onValueChange={() => (custom_option = selected_option)}
								allowDeselect={false}
							>
								<Select.Trigger id="constant" class="w-full">{selected_option}</Select.Trigger>
								<Select.Content>
									{#each option as { value, label } (value)}
										<Select.Item {value}>{label}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</div>
						<div class="flex w-full flex-col gap-1.5">
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
						</div>
						<div class="flex w-full flex-col gap-1.5">
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
					</div>
				</Sidebar.GroupContent>
			</Sidebar.Group>
			<Sidebar.Separator />
			<Sidebar.Group>
				<Sidebar.GroupLabel>Result Configuration</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<div class="w-full space-y-2 px-2">
						<div class="space-y-2">
							<Label for="display">Display Result As</Label>
							<RadioGroup.Root id="display" bind:value={display}>
								{#each display_option as { value, label } (value)}
									<div class="flex items-center space-x-2">
										<RadioGroup.Item {value} id={value} />
										<Label for={value} class="font-normal">{label}</Label>
									</div>
								{/each}
							</RadioGroup.Root>
						</div>

						<div class="space-y-2">
							<Label for="display">Show For</Label>
							<RadioGroup.Root id="display" bind:value={show_as}>
								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="Print" id="print" />
									<Label for="print" class="font-normal">Print</Label>
								</div>
								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="Web" id="web" />
									<Label for="web" class="font-normal">Web</Label>
								</div>
							</RadioGroup.Root>
						</div>

						<Label
							class="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-violet-600 has-[[aria-checked=true]]:bg-violet-50 dark:has-[[aria-checked=true]]:border-violet-900 dark:has-[[aria-checked=true]]:bg-violet-950"
						>
							<Checkbox
								id="simulate"
								name="simulate"
								bind:checked={visualize}
								class="data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600 data-[state=checked]:text-white dark:data-[state=checked]:border-violet-700 dark:data-[state=checked]:bg-violet-700"
							/>

							<div class="grid gap-1.5 font-normal">
								<p class="text-sm leading-none font-medium">Visualize Size</p>
								<p class="text-sm text-muted-foreground">Visualize the size in the result table.</p>
							</div>
						</Label>

						<Label
							class="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-violet-600 has-[[aria-checked=true]]:bg-violet-50 dark:has-[[aria-checked=true]]:border-violet-900 dark:has-[[aria-checked=true]]:bg-violet-950"
						>
							<Checkbox
								id="rounding"
								name="rounding"
								bind:checked={rounding}
								class="data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600 data-[state=checked]:text-white dark:data-[state=checked]:border-violet-700 dark:data-[state=checked]:bg-violet-700"
							/>
							<div class="grid gap-1.5 font-normal">
								<p class="text-sm leading-none font-medium">Rounding</p>
								<p class="text-sm text-muted-foreground">
									Round the result to a number of fractional digits.
								</p>
							</div>
						</Label>

						<div class="flex w-full flex-col gap-1.5">
							<Label for="roundingTo">Fractional Digit</Label>
							<Input
								type="number"
								id="roundingTo"
								name="roundingTo"
								min="1"
								max="100"
								defaultValue="1"
								placeholder="The amount of number behind point"
								bind:value={rounding_to}
								disabled={!rounding}
							/>
						</div>

						<Button
							type="button"
							variant="default"
							size="sm"
							class="mt-2 w-full"
							onclick={() => {
								selected_option = "1.618";
								custom_option = "1.618";
								show_as = "Print";
								visualize = false;
								rounding = true;
								display = "px";
								rounding_to = 1;
							}}>Reset</Button
						>
					</div>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</form>
	</Sidebar.Content>
</Sidebar.Root>
