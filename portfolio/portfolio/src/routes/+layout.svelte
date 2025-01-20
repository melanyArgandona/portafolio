<script lang="ts">
  import '$lib/styles.css';
  import Footer from '$components/Footer.svelte';
  import Header from '$components/Header.svelte';

  export let data: { socialNetworks: Array<{ type: string; link: string }> };
</script>

<div class="flex flex-col min-h-screen">
  <Header />

  <slot />

  <Footer socialNetworks={data.socialNetworks} />
</div>
