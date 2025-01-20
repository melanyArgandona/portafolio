<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { Registry } from './Registry';
  import type { User } from './User';
  import type { Subscription } from 'rxjs';

  let forceLogin = false;
  let manual = false;
  let user: User | null;
  export { forceLogin, manual };
  let subscription: Subscription;
  onMount(() => {
    Registry.auth.checkParams();
    subscription = Registry.auth.getUser().subscribe((data) => {
      user = data;
      console.log(user);
      if (user == null && forceLogin) {
        Registry.auth.login({ redirectUri: location.href });
      }
    });
  });

  onDestroy(() => {
    subscription?.unsubscribe();
  });
</script>

{#if user && manual}
  <slot name="authed" {user} />
{:else if !user && manual}
  <slot name="not_authed" />
{:else if user && !manual}
  <slot {user} />
{/if}
