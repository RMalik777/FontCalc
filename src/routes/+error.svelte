<script lang="ts">
	import { page } from '$app/stores';
	import { draw, fade } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';

	let image = $state(false);
	$effect(() => {
		image = true;
	});
</script>

<main
	class="relative flex h-dvh w-dvw flex-col items-center justify-center gap-4 text-xl font-medium tracking-tight"
>
	<div class="h-12 w-auto">
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
		<h1 class="text-2xl font-bold">{$page?.status}</h1>
		<p class="">{$page?.error?.message}</p>
	</section>
</main>
