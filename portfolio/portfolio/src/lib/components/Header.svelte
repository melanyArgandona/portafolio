<script lang="ts">
  import AlignLeftIcon from '$icons/AlignLeftIcon.svelte';
  import AuthGuard from '$lib/auth/AuthGuard.svelte';
  import { Registry } from '$lib/auth/Registry';
  function handleLogin() {
    Registry.auth.login({ redirectUri: location.href });
  }
  function handleLogout() {
    Registry.auth.logout();
  }
</script>

<div class="grid place-items-center">
  <div class="navbar bg-base-100 max-w-5xl">
    <div class="navbar-start">
      <div class="dropdown">
        <label for="dropdown" tabindex="-1" class="btn btn-ghost lg:hidden">
          <AlignLeftIcon />
        </label>
        <ul
          tabindex="-1"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><a href="/works">Work</a></li>
          <li><a href="/skills">Skills</a></li>
          <li><a href="contactme">Contact Me</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
      <a href="/" class="btn btn-ghost normal-case text-xl">Portfolio</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/works">Work</a></li>
        <li><a href="/skills">Skills</a></li>
        <li><a href="contactme">Contact Me</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <AuthGuard manual={true}>
        <div slot="authed" let:user>
          <div class="dropdown dropdown-end">
            <label for="dropdown" tabindex="-2" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img src={user?.avatar} alt="User" />
              </div>
            </label>
            <ul
              tabindex="-2"
              class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li><button on:click={handleLogout}>Logout</button></li>
            </ul>
          </div>
        </div>
        <button slot="not_authed" class="btn" on:click={handleLogin}>Sign In</button>
      </AuthGuard>
    </div>
  </div>
</div>
