import { browser } from '$app/environment';
import { Registry } from '$lib/auth/Registry';

export const load = () => {
	if (browser) {
		Registry.auth.inBrowserInit();
	}
	return {};
};
