<script lang="ts">
  import Content from '$components/Content.svelte';
  import WorkModal from '$components/works/WorkModal.svelte';
  import EllipsisVerticalIcon from '$icons/EllipsisVerticalIcon.svelte';
  import AuthGuard from '$lib/auth/AuthGuard.svelte';
  import type { Work } from '$lib/models/Work';

  export let data: { works: Array<Work> };
  let form = {};
  let modalAction: 'Insert' | 'Update';
  function resetForm() {
    form = {};
  }
  function onCreate() {
    resetForm();
    modalAction = 'Insert';
  }
  function onUpdate(data: Work) {
    form = data;
    modalAction = 'Update';
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<Content bgColor="black">
  <WorkModal modalId="work-modal" {form} action={modalAction} />
  <div class="flex flex-row justify-between items-center">
    <article class="prose">
      <h3 class="text-white">Featured Work</h3>
    </article>
    <AuthGuard>
      <label for="work-modal" class="btn float-right" on:click={onCreate}>Create</label>
    </AuthGuard>
  </div>
  {#each data?.works as work}
    <div class="card lg:card-side bg-base-100 shadow-xl">
      <figure><img class="object-cover h-64 w-full lg:w-96" src={work.image} alt="Movie" /></figure>
      <div class="card-body max-w-prose">
        <div class="flex flex-row justify-between">
          <h2 class="card-title">{work.title}</h2>
          <div class="dropdown dropdown-bottom dropdown-end">
            <label for="dropdown" tabindex="-1" class="btn btn-ghost m-1">
              <EllipsisVerticalIcon />
            </label>
            <ul tabindex="-1" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><label for="work-modal" on:click={() => onUpdate(work)}>Edit</label></li>
            </ul>
          </div>
        </div>
        <p>{work.description}</p>
        <div class="card-actions justify-start">
          <a class="btn btn-primary" href={work.link}>Live View</a>
        </div>
      </div>
    </div>
  {/each}
</Content>
