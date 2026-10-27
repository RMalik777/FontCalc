<script lang="ts">
	import { resetMode, setMode, userPrefersMode } from "mode-watcher";

	import ContrastIcon from "@lucide/svelte/icons/contrast";
	import MoonIcon from "@lucide/svelte/icons/moon";
	import SunIcon from "@lucide/svelte/icons/sun";

	import { buttonVariants } from "#lib/components/ui/button/index.js";
	import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";
	import { cn } from "#lib/utils.js";

	const selectedMode = $derived(userPrefersMode.current);
	const iconClass = cn("absolute h-4 w-4 transition-all! duration-200 ease-out");
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: "ghost", size: "icon" })}>
		<SunIcon
			class={cn(selectedMode === "light" ? "scale-100 rotate-0" : "scale-0 rotate-90", iconClass)}
		/>
		<MoonIcon
			class={cn(selectedMode === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90", iconClass)}
		/>
		<ContrastIcon
			class={cn(selectedMode === "system" ? "scale-100 rotate-0" : "scale-0 rotate-90", iconClass)}
		/>
		<span class="sr-only">Select theme</span>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item onclick={() => setMode("light")}>
			<SunIcon />
			Light
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => setMode("dark")}>
			<MoonIcon />
			Dark
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => resetMode()}>
			<ContrastIcon />
			System
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
