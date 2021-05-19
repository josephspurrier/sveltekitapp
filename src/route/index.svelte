<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { getClientSession } from '~/store/session';

	export const load: Load = () => {
		const auth = getClientSession(true);

		if (!auth.loggedIn) {
			// If not authenticated, then redirect.
			return {
				status: 302,
				redirect: '/login'
			};
		}

		return {};
	};
</script>

<div>
	<section class="hero is-primary">
		<div class="hero-body">
			<div class="container">
				<h1 class="title">Welcome</h1>
				<h2 class="subtitle">Login was successful</h2>
			</div>
		</div>
	</section>
	<br />
	<div class="container">
		<a href="/notepad" data-cy="notepad-link"> Click here to access your Notepad. </a>
	</div>
</div>
