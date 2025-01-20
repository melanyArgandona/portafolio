<script lang="ts">
  import { enhance, type SubmitFunction } from '$app/forms';
  import type { ActionResult } from '@sveltejs/kit';
  import { WorkSchema } from './WorkSchema';

  export let modalId: string;
  export let action: 'Insert' | 'Update' = 'Insert';
  export let form: { [keys: string]: any };
  let errors: { [keys: string]: any } = {};
  let checked: boolean;

  $: if (checked) {
    errors = {};
  }
  function validate(formData: FormData) {
    try {
      const data = Object.fromEntries(formData);
      const result = WorkSchema.parse(data);
      errors = {};
      return result;
    } catch (err: any) {
      const { fieldErrors } = err.flatten();
      errors = fieldErrors;
    }
  }
  const onSubmitForm: SubmitFunction = ({ data, cancel }) => {
    const result = validate(data);
    if (!result) {
      cancel();
    }
    // after submit callback, this function will run after submit on server side
    return async ({ result, update }) => {
      if (result.type === 'success') {
        alert('Work stored successfully!');
        checked = false;
      }
      await update();
    };
  };
</script>

<input type="checkbox" id={modalId} class="modal-toggle" bind:checked />

<div class="modal">
  <div class="modal-box relative">
    <label for={modalId} class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <form
      action={action === 'Insert' ? '?/create' : '?/update'}
      method="POST"
      use:enhance={onSubmitForm}
    >
      <h1 class="text-2xl font-medium text-center my-2">{action} a Featured Work</h1>
      {#if form?.id}
        <input type="hidden" name="id" value={form.id} />
      {/if}
      <div class="form-control w-full max-w-xs">
        <label for="title" class="label">
          <span class="label-text">Title</span>
        </label>
        <input
          type="text"
          name="title"
          class="input w-full max-w-xs {errors?.title ? 'input-error' : 'input-bordered'}"
          placeholder="Add a title"
          value={form?.title ?? ''}
        />
        <label for="title" class="label">
          {#if errors?.title}
            <span class="label-text-alt text-error">{errors?.title[0]}</span>
          {/if}
        </label>
      </div>
      <div class="form-control w-full max-w-xs">
        <label for="description" class="label">
          <span class="label-text">Description</span>
        </label>
        <textarea
          name="description"
          class="input textarea h-24 w-full max-w-xs {errors?.description
            ? 'textarea-error'
            : 'textarea-bordered'}"
          placeholder="Add a description"
          value={form?.description ?? ''}
        />
        <label for="description" class="label">
          {#if errors?.description}
            <span class="label-text-alt text-error">{errors?.description[0]}</span>
          {/if}
        </label>
      </div>
      <div class="form-control w-full max-w-xs">
        <label for="link" class="label">
          <span class="label-text">Live View Link</span>
        </label>
        <input
          type="text"
          name="link"
          class="input w-full max-w-xs {errors?.link ? 'input-error' : 'input-bordered'}"
          placeholder="Add a live view link"
          value={form?.link ?? ''}
        />
        <label for="image" class="label">
          {#if errors?.link}
            <span class="label-text-alt text-error">{errors?.link[0]}</span>
          {/if}
        </label>
      </div>
      <div class="form-control w-full max-w-xs">
        <label for="image" class="label">
          <span class="label-text">Image URL</span>
        </label>
        <input
          type="text"
          name="image"
          class="input w-full max-w-xs {errors?.image ? 'input-error' : 'input-bordered'}"
          placeholder="Add an image URL"
          value={form?.image ?? ''}
        />
        <label for="image" class="label">
          {#if errors?.image}
            <span class="label-text-alt text-error">{errors?.image[0]}</span>
          {/if}
        </label>
      </div>
      <div class="divider" />
      <div class="modal-action">
        <button class="btn" type="submit">{action.toLocaleUpperCase()}</button>
      </div>
    </form>
  </div>
</div>
