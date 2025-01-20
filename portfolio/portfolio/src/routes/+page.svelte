<script>
  import Content from '$components/Content.svelte';
  import HeartIcon from '$icons/HeartIcon.svelte';
  import PlayIcon from '$icons/PlayIcon.svelte';
</script>

<Content>
  <div class="grid grid-cols-2 gap-4">
    <article class="prose">
      <div class="btn gap-2">
        <HeartIcon />
        Hellow All
      </div>
      <div class="divider" />
      <h1>I am Jabber Bee,</h1>
      <h1>A UI/UX designer and Developer</h1>
      <div>
        <a class="btn gap-2" href="/works">
          View My Work
          <PlayIcon />
        </a>
        <a class="btn btn-outline" href="/contactme">Contact Me</a>
      </div>
    </article>

    <img
      class="rounded-xl object-cover"
      src="https://slp-statics.astockcdn.net/static_assets/staging/23winter/home/EMEA/curated-collections/card-3.jpg?width=580&format=webp"
      alt="My Art"
    />
  </div>
</Content>
