<script context="module" lang="ts">
	import { clearClientSession, clearServerSession } from '~/store/session';

	export async function load() {
		clearClientSession();
		await clearServerSession();
		return {
			status: 302,
			redirect: '/login'
		};
	}
</script>
