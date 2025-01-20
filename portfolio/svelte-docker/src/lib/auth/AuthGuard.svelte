<script lang="ts">
	import { onMount } from 'svelte';
	import { Registry } from './Registry';
	import type { User } from './User';

	let forceLogin = false;
	let manual = false;
	let user: User;
	export { forceLogin, manual };

	onMount(() => {
		Registry.auth.checkParams();
		Registry.auth.getUser().subscribe((data: User) => {
			user = data;
			console.log(user);
			if (user == null && forceLogin) {
				Registry.auth.login({ redirectUri: location.href });
			}
		});
	});
</script>

{#if user && manual}
	<slot name="authed" {user} />
{:else if !user && manual}
	<slot name="not_authed" />
{:else if user && !manual}
	<slot />
{/if}
