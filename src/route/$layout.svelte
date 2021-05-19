<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { getClientSession } from '~/store/session';
	import { isAllowedAnonymous, isDeniedAuthenticated } from '~/route/_acl';

	export const load: Load = ({ page }) => {
		const auth = getClientSession(true);

		if (!auth.loggedIn) {
			// Check for allowed routes.
			if (!isAllowedAnonymous('GET', page.path)) {
				// If not authenticated, then do a redirect.
				return {
					status: 302,
					redirect: '/login',
				};
			}
		} else {
			// Check for not allowed routes.
			if (isDeniedAuthenticated('GET', page.path)) {
				// If not authenticated, then do a redirect.
				return {
					status: 302,
					redirect: '/',
				};
			}
		}

		return {};
	};
</script>

<script lang="ts">
	import Flashbox from '~/component/flashbox.svelte';
	import Menu from '~/component/menu.svelte';
</script>

<Menu />

<main>
	<slot />
</main>

<Flashbox />

<style global lang="scss">
	@import '../app.scss';
</style>
