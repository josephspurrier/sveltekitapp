<script lang="ts">
	import Page from '~/component/page.svelte';
	import Input from '~/component/input.svelte';
	import { submit, submitText } from '~/model/userlogin';
	import type { UserLogin } from '~/type/user';
	import { goto } from '$app/navigation';

	let user: UserLogin = {
		email: '',
		password: '',
	};

	const clear = () => {
		// Clear the form.
		user = { email: '', password: '' };

		// Set the first text input as active.
		const firstField = document.getElementById('email');
		if (firstField) {
			firstField.focus();
		}
	};
</script>

<Page title="Login" description="Enter your login information.">
	<div class="container">
		<form
			name="login"
			on:submit|preventDefault={(e) => {
				submit(e, user)
					.then(() => {
						goto('/');
					})
					.catch(() => clear());
			}}
		>
			<Input
				label="Email"
				name="email"
				type="email"
				required={true}
				bind:value={user.email}
				autofocus
			/>

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
						{submitText('Submit')}
					</button>
				</p>

				<p class="control">
					<button type="button" class="button is-light" on:click={clear}> Clear </button>
				</p>

				<p class="control">
					<a href="/register" class="button is-light"> Register </a>
				</p>
			</div>
		</form>
	</div>
</Page>
