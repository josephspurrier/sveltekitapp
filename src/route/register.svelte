<script lang="ts">
	import Page from '~/component/page.svelte';
	import Input from '~/component/input.svelte';
	import { submit, submitText } from '~/model/userregister';
	import type { UserRegister } from '~/type/user';
	import { goto } from '$app/navigation';

	export let firstName = '';
	export let lastName = '';
	export let email = '';
	export let password = '';

	let user: UserRegister = {
		first_name: firstName || '',
		last_name: lastName || '',
		email: email || '',
		password: password || '',
	};

	const clear = () => {
		// Clear the form.
		user = { first_name: '', last_name: '', email: '', password: '' };

		// Set the first text input as active.
		const firstField = document.getElementById('first_name');
		if (firstField) {
			firstField.focus();
		}
	};
</script>

<Page title="Register" description="Enter your information.">
	<div class="container">
		<form
			name="register"
			on:submit|preventDefault={(e) => {
				submit(e, user)
					.then(() => {
						goto('/login');
					})
					.catch(() => clear());
			}}
		>
			<Input
				label="First Name"
				name="first_name"
				type="text"
				required={true}
				bind:value={user.first_name}
				autofocus
			/>

			<Input
				label="Last Name"
				name="last_name"
				type="text"
				required={true}
				bind:value={user.last_name}
			/>

			<Input label="Email" name="email" type="email" required={true} bind:value={user.email} />

			<Input
				label="Password"
				name="password"
				required={true}
				bind:value={user.password}
				type="password"
			/>

			<div class="field is-grouped">
				<p class="control">
					<button id="submit" type="submit" data-cy="submit" class="button is-primary">
						{submitText('Create Account')}
					</button>
				</p>

				<p class="control">
					<button type="button" class="button is-light" on:click={clear}> Clear </button>
				</p>
			</div>
		</form>
	</div>
</Page>
