<script lang="ts">
	import { untrack } from "svelte";

	import * as Sidebar from "$lib/components/ui/sidebar/index";

	import AppSidebar from "$lib/components/sidebar.svelte";
	import Result from "$lib/components/result-list.svelte";
	import Snippet from "$lib/components/snippet.svelte";

	let base_size = $state(16);
	let selected_option = $state("1.618");
	// This is intentional, custom_option initial value need to be the same as selected_option initial value
	let custom_option: string | undefined = $state(untrack(() => selected_option));
	let show_as: "Web" | "Print" = $state("Print");
	let display: "px" | "rem" = $state("px");
	let visualize = $state(false);
	let rounding = $state(true);
	let rounding_to = $state(1);
	const constant = $derived(selected_option === "Custom" ? custom_option : selected_option);
</script>

<Sidebar.Provider>
	<AppSidebar
		bind:selected_option
		bind:custom_option
		bind:show_as
		bind:visualize
		bind:rounding
		bind:rounding_to
		bind:display
		bind:base_size
	/>
	<main class="h-fit min-h-dvh grow">
		<Sidebar.Trigger />
		<h1 class="self-center text-center text-4xl font-semibold">Font Size Calculator</h1>
		<div class="flex w-full flex-row justify-between gap-4">
			<Result {base_size} {constant} {display} {show_as} {visualize} {rounding} {rounding_to} />
		</div>

		<Snippet {base_size} />
	</main>
</Sidebar.Provider>
