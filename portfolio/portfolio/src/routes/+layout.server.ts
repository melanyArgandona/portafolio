import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
  const socialNetworks = await fetch('/api/social-networks').then((resp) => resp.json());
  return {
    socialNetworks
  };
};
