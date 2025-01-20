<script>
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import AuthGuard from '$lib/auth/AuthGuard.svelte';

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

<h1>Main page</h1>
<AuthGuard manual={true}>
	<div slot="authed" let:user>
		<h1>Welcome to Home page, if you logout you can login again with login button.</h1>
		<p>Hey I am logged as <strong>{user.username}</strong></p>
		<p>Go to <a href="/secured">secured</a> page</p>
		<button on:click={logout}>Logout</button>
	</div>
	<button slot="not_authed" on:click={login}>Login</button>
</AuthGuard>
