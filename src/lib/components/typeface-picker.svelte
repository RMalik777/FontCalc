<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query";

	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";

	import { Button } from "$lib/components/ui/button";
	import * as Command from "$lib/components/ui/command";
	import * as Popover from "$lib/components/ui/popover";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import * as ToggleGroup from "$lib/components/ui/toggle-group";

	import {
		categories,
		fontsQuery,
		fontStack,
		matchesFamily,
		menuFamily,
		registerMenuFont,
		type FontCategory,
		type GoogleFont,
	} from "$lib/fonts";
	import { getScale } from "$lib/scale.svelte";

	let { id, disabled = false }: { id: string; disabled?: boolean } = $props();

	const DEFAULT_FAMILY = "Gambetta";
	// Rendering every family at once is slow, so the list shows the most popular matches.
	const LIMIT = 50;

	const scale = getScale();

	let open = $state(false);
	let search = $state("");
	let category = $state<FontCategory | "all">("all");

	// Fetch the list the first time the picker opens. After that it comes from the cache.
	const fonts = createQuery(() => ({ ...fontsQuery, enabled: open }));

	const category_label = $derived(categories.find((c) => c.value === category)?.label);

	function inCategory(value: FontCategory) {
		return category === "all" || category === value;
	}

	const matches = $derived(
		(fonts.data ?? []).filter(
			(font) => inCategory(font.category) && matchesFamily(font.family, search),
		),
	);
	const shown = $derived(matches.slice(0, LIMIT));
	const show_default = $derived(inCategory("serif") && matchesFamily(DEFAULT_FAMILY, search));

	$effect(() => {
		for (const font of shown) registerMenuFont(font);
	});

	function select(font: GoogleFont | null) {
		scale.typeface = font;
		open = false;
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger {id} {disabled}>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				class="w-full justify-between font-normal"
			>
				<span
					class="truncate text-base"
					style:font-family={scale.typeface
						? fontStack(scale.typeface.family, scale.typeface.category)
						: "var(--font-serif)"}
				>
					{scale.typeface?.family ?? DEFAULT_FAMILY}
				</span>
				<ChevronsUpDown data-icon="inline-end" class="text-muted-foreground" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content preventScroll align="start" class="w-(--bits-popover-anchor-width) min-w-88 p-0">
		<Command.Root shouldFilter={false}>
			<Command.Input placeholder="Search Google Fonts" bind:value={search} />
			<!-- Keep Enter on a category from choosing the highlighted family. -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="px-1 pt-2 pb-1" onkeydown={(e) => e.stopPropagation()}>
				<ToggleGroup.Root
					type="single"
					variant="outline"
					size="sm"
					spacing={1}
					class="w-full"
					aria-label="Category"
					bind:value={() => category, (v) => v && (category = v as FontCategory | "all")}
				>
					<ToggleGroup.Item value="all" class="flex-1">All</ToggleGroup.Item>
					{#each categories as { value, label } (value)}
						<ToggleGroup.Item {value} class="flex-1">{label}</ToggleGroup.Item>
					{/each}
				</ToggleGroup.Root>
			</div>
			<Command.List>
				{#if show_default}
					<Command.Group heading="Default">
						<Command.Item
							value={DEFAULT_FAMILY}
							data-checked={scale.typeface === null}
							onSelect={() => select(null)}
						>
							<span class="flex-1 truncate font-serif text-base">{DEFAULT_FAMILY}</span>
							<span class="text-xs text-muted-foreground">serif</span>
						</Command.Item>
					</Command.Group>
				{/if}

				{#if fonts.isPending}
					<Command.Loading>
						<div class="flex flex-col gap-3 px-2 py-3" aria-label="Loading fonts">
							{#each { length: 6 }, i (i)}
								<Skeleton class="h-4" style="width: {90 - i * 9}%" />
							{/each}
						</div>
					</Command.Loading>
				{:else if fonts.isError}
					<div class="flex flex-col items-start gap-2 px-2 py-3 text-sm">
						<p class="text-destructive">Google Fonts could not be loaded. {fonts.error.message}</p>
						<Button variant="outline" size="sm" onclick={() => fonts.refetch()}>Try again</Button>
					</div>
				{:else if shown.length}
					<Command.Group heading="Google Fonts">
						{#each shown as font (font.family)}
							<Command.Item
								value={font.family}
								data-checked={scale.typeface?.family === font.family}
								onSelect={() => select(font)}
							>
								<span
									class="flex-1 truncate text-base"
									style:font-family={fontStack(menuFamily(font), font.category)}
								>
									{font.family}
								</span>
								<span class="text-xs text-muted-foreground">{font.category}</span>
							</Command.Item>
						{/each}
					</Command.Group>
				{:else if !show_default}
					<div class="flex flex-col items-center gap-2 px-3 py-6 text-center text-sm">
						{#if category === "all"}
							<p>No family matches “{search.trim()}”.</p>
							<p class="text-muted-foreground">
								Only Google Fonts families are listed, so fonts such as Helvetica are not here.
							</p>
						{:else}
							<p>No {category_label?.toLowerCase()} family matches “{search.trim()}”.</p>
							<Button variant="outline" size="sm" onclick={() => (category = "all")}>
								Search all categories
							</Button>
						{/if}
					</div>
				{/if}
			</Command.List>
			{#if matches.length > LIMIT}
				<p class="border-t border-border px-3 py-2 text-xs text-muted-foreground">
					Showing the {LIMIT} most popular of {matches.length.toLocaleString()} families. Type to narrow
					the list.
				</p>
			{/if}
		</Command.Root>
	</Popover.Content>
</Popover.Root>
