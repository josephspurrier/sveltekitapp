<script lang="ts">
	import { onMount } from 'svelte';
	import { isLoggedIn } from '~/store/session';

	$: shownMobileNavClass = '';
	$: shownNavClass = '';
	onMount(() => {
		// Close the nav menus when an item is clicked.
		const links = document.querySelectorAll('a.navbar-item');
		links.forEach((link) => {
			link.addEventListener('click', function (elem) {
				shownNavClass = '';
				shownMobileNavClass = '';
				closeMenu();
			});
		});
	});

	// closeMenu is separate so it can be called from the Logout button, otherwise
	// it will be removed because the event listener can trigger.
	function closeMenu() {
		// Close the menu on click.
		const dm = document.getElementById('ddmenu');
		if (dm) {
			dm.classList.toggle('is-hoverable');
			setTimeout(() => {
				dm.classList.toggle('is-hoverable');
			}, 500);
		}
	}
</script>

<main>
	<nav class="navbar is-black" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<a class="navbar-item" data-cy="home-link" href="/">
				<strong>sveltekitapp</strong>
			</a>

			<a
				id="mobile-navbar-top"
				role="button"
				class={'navbar-burger burger ' + shownMobileNavClass}
				aria-label="menu"
				aria-expanded="false"
				data-target="navbar-top"
				on:click={() => {
					if (shownMobileNavClass == 'is-active') {
						shownMobileNavClass = '';
					} else {
						shownMobileNavClass = 'is-active';
					}
				}}
			>
				<span aria-hidden="true" />
				<span aria-hidden="true" />
				<span aria-hidden="true" />
			</a>
		</div>

		<div id="navbar-top" class={'navbar-menu ' + shownMobileNavClass}>
			<div class="navbar-end">
				<div id="ddmenu" class={`navbar-item is-hoverable has-dropdown ` + shownNavClass}>
					<!-- svelte-ignore a11y-missing-attribute -->
					<a class="navbar-link">{($isLoggedIn && 'Joe') || 'Menu'}</a>
					<div class="navbar-dropdown is-right">
						{#if !$isLoggedIn}
							<a class="navbar-item" href="/login"> Login </a>
						{/if}
						<a class="navbar-item" href={`https://petstore.swagger.io/?url=/static/swagger.json`}>
							Swagger
						</a>

						<a class="navbar-item" href="/about"> About </a>
						<hr class="navbar-divider" />
						{#if $isLoggedIn}
							<a class="navbar-item" on:click={closeMenu} href="/logout"> Logout </a>
						{/if}
						<div class="navbar-item">v1.0.0</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</main>
