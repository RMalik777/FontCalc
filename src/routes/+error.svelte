<script lang="ts">
	import { page } from "$app/stores";
	import { draw, fade } from "svelte/transition";
	import { expoOut } from "svelte/easing";
	import { buttonVariant } from "$lib/components/ui/button";
	import { merge } from "$lib/utils/class-merge";

	let image = $state(false);
	$effect(() => {
		image = true;
	});
</script>

<main
	class="flex h-dvh w-dvw flex-col items-center justify-center gap-6 scroll-smooth text-xl font-medium tracking-tight antialiased"
>
	<div class="absolute bottom-1 aspect-square h-10 w-auto sm:h-12 md:h-14 lg:h-16 xl:h-20">
		{#if image}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-cat h-full w-full"
			>
				<path
					in:draw={{ delay: 0, duration: 200, easing: expoOut }}
					out:fade={{ delay: 0, duration: 200, easing: expoOut }}
					d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"
				/>
				<path
					in:draw={{ delay: 200, duration: 100, easing: expoOut }}
					out:fade={{ delay: 0, duration: 200, easing: expoOut }}
					d="M8 14v.5"
				/>
				<path
					in:draw={{ delay: 200, duration: 100, easing: expoOut }}
					out:fade={{ delay: 0, duration: 200, easing: expoOut }}
					d="M16 14v.5"
				/>
				<path
					in:draw={{ delay: 300, duration: 100, easing: expoOut }}
					out:fade={{ delay: 0, duration: 200, easing: expoOut }}
					d="M11.25 16.25h1.5L12 17l-.75-.75Z"
				/></svg
			>
		{/if}
	</div>

	<section class="text-center leading-none">
		<h1 class="text-5xl font-semibold sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
			{$page?.status}
		</h1>
		<p class="text-2xl lg:text-3xl">{$page?.error?.message}</p>
	</section>
	<a href="/" class={merge(buttonVariant({ size: "default" }), "text-base")}>Back to Home</a>
</main>
