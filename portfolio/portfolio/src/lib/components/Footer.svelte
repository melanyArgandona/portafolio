<script lang="ts">
  import HashtagIcon from '$icons/HashtagIcon.svelte';
  import { SocialNetworksMap } from '$lib/utils/socialNetworks';

  export let socialNetworks: Array<{ type: string; link: string }> = [];
</script>

<div class="grid place-items-center bg-neutral">
  <footer class="footer items-center p-4 text-neutral-content max-w-5xl">
    <div class="items-center grid-flow-col">
      <HashtagIcon class="fill-current w-8 h-8" />
      <p>Copyright © 2023 - All right reserved</p>
    </div>
    <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      {#each socialNetworks as socialNetwork}
        <a href={socialNetwork.link}
          ><svelte:component this={SocialNetworksMap[socialNetwork.type]} /></a
        >
      {/each}
    </div>
  </footer>
</div>
