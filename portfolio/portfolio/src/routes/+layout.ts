import { browser } from '$app/environment';
import { Registry } from '$lib/auth/Registry';

export const load = ({ data }) => {
  if (browser) {
    Registry.auth.inBrowserInit();
  }
  return data;
};
