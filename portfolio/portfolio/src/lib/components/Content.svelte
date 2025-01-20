<script lang="ts">
  export let bgColor: 'white' | 'black' = 'white';
</script>

<div data-testid="content-element" class="flex-1" class:bgColor={bgColor === 'black'}>
  <div class="flex justify-center">
    <div class="grid max-w-5xl gap-5 py-8">
      <slot />
    </div>
  </div>
</div>

<style>
  .bgColor {
    background-color: black;
  }
</style>
