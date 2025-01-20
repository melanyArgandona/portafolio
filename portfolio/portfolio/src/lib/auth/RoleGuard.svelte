<script lang="ts">
  import { onMount } from 'svelte';
  import { Registry } from './Registry';
  import type { User } from './User';
  import type { Subscription } from 'rxjs';
  import { onDestroy } from 'svelte/types/runtime/internal/lifecycle';

  let roles: string[] = [];
  let manual = false;
  let user: User | null;
  export { roles, manual };
  let subscription: Subscription;
  let hasRole = (roles: string[]): boolean => {
    if (user) {
      for (let role of roles) {
        if (user.roles.includes(role)) return true;
      }
    }
    return false;
  };

  onMount(() => {
    subscription = Registry.auth.getUser().subscribe((data) => {
      user = data;
    });
  });

  onDestroy(() => {
    subscription?.unsubscribe();
  });
</script>

{#if user}
  {#if hasRole(roles) && manual}
    <slot name="role" {user} {roles} />
  {:else if !hasRole(roles) && manual}
    <slot name="no_role" />
  {:else if hasRole(roles) && !manual}
    <slot />
  {/if}
{/if}
