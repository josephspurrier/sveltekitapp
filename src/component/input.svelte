<script lang="ts">
	import { onMount } from 'svelte';

	export let label: string = '';
	export let name: string;
	export let type: string;
	export let placeholder: string = '';
	export let required: boolean = false;
	export let value: string;
	export let autofocus: boolean = false;
	export let keypress: (e: KeyboardEvent) => void = () => {};

	const handleInput = (e: Event) => {
		if (e.target && (e.target as HTMLInputElement)) {
			const elem = e.target as HTMLInputElement;
			value = elem.value;
		}
	};

	// Autofocus if set to true.
	let fieldInput: HTMLElement;
	onMount(() => {
		if (autofocus) {
			setTimeout(() => {
				fieldInput.focus();
			}, 0);
		}
	});
</script>

<div class="field">
	<label for={name} class="label">{label}</label>
	<div class="control">
		<input
			id={name}
			{name}
			{type}
			{placeholder}
			class="input"
			data-cy={name}
			{required}
			{value}
			on:keypress={keypress}
			on:input={handleInput}
			bind:this={fieldInput}
		/>
	</div>
</div>
