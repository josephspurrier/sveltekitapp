<script context="module" lang="ts">
	import { flashMessages } from '~/store/flash';
	import type { FlashMessage } from '~/type/flash';

	// Create a flash message class with Bulma.
	// http://bulma.io/documentation/components/message/

	export const removeFlash = (i: FlashMessage): void => {
		flashMessages.update((n) => {
			n = n.filter((v) => {
				return v !== i;
			});
			return n;
		});
	};
</script>

<script lang="ts">
</script>

<div class="flashMessage">
	{#each $flashMessages as i}
		<div class={`notification ${i.style}`}>
			{i.message}
			<button
				class="delete"
				on:click={() => {
					removeFlash(i);
				}}
			/>
		</div>
	{/each}
</div>

<style>
	.flashMessage {
		margin-top: 1em;
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		z-index: 100;
		margin: 0;
	}
</style>
