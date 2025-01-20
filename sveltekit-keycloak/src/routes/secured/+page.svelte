<script>
	import { Registry } from '$lib/auth/Registry';
	import RoleGuard from '$lib/auth/RoleGuard.svelte';
	import AuthGuard from '$lib/auth/AuthGuard.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		Registry.auth.checkParams();
	});

	let login = () => {
		Registry.auth.login({ redirectUri: location.href });
	};

	let logout = () => {
		Registry.auth.logout();
	};
</script>

<h1>Secured</h1>
<AuthGuard manual={true} forceLogin={true}>
	<div slot="authed" let:user>
		<h1>Welcome to your Secured page, if you logout it will force you to login directly</h1>
		<p>Hey I am logged as <strong>{user.username}</strong></p>
		<button on:click={logout}>Logout</button>
		<RoleGuard roles={['admin']} manual={true}>
			<p slot="role">You are an admin.</p>
			<p slot="no_role">Your user does not have role admin.</p>
		</RoleGuard>
	</div>
	<button slot="not_authed" on:click={login}>Login</button>
</AuthGuard>
