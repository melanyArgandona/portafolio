import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ cookies }) => {
  cookies.set('account', 'test', { path: '/' });
};
