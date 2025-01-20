<script lang="ts">
  import { goto } from '$app/navigation';
  import AuthGuard from '$lib/auth/AuthGuard.svelte';
  import { Registry } from '$lib/auth/Registry';
  import type { Subscription } from 'rxjs';
  import { onDestroy, onMount } from 'svelte';

  let subscription: Subscription;

  onMount(() => {
    subscription = Registry.auth.getUser().subscribe((user) => {
      if (user) {
        goto('/');
      }
    });
  });
  onDestroy(() => {
    subscription?.unsubscribe();
  });
</script>

<AuthGuard forceLogin={true} />
<div>loading...</div>
