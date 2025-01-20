import { Observable } from '$lib/observer/Observable';
import type { User } from '$lib/auth/User';
import Keycloak, { type KeycloakConfig } from 'keycloak-js';

export class Auth {
	#keycloak!: Keycloak;
	#observable: Observable<User>;
	#user: User | null;
	#initInProgress = false;
	#options: KeycloakConfig;

	public constructor(options: KeycloakConfig) {
		this.#observable = new Observable<User>();
		this.#options = options;
		this.#user = null;
	}

	public inBrowserInit() {
		if (!this.#keycloak) {
			// make sure not to load it twice
			this.#keycloak = new Keycloak(this.#options);
		}
		this.#user = null;
		if (localStorage.getItem('access_token') !== null) {
			// if access token is set, attempt to refresh
			this.init(this.buildInitParams());
		}
	}

	private init(params?: any) {
		this.#initInProgress = true;
		this.#keycloak.init(params).then((authenticated) => {
			if (this.storeCredentialsAndBuildUser(authenticated)) {
				this.#keycloak.onTokenExpired = () => {
					this.#keycloak.updateToken(5).then((refreshed) => {
						this.storeCredentialsAndBuildUser(refreshed);
					});
				};
			}
			this.#initInProgress = false;
		});
	}

	private storeCredentialsAndBuildUser(authenticated: boolean) {
		if (
			authenticated &&
			this.#keycloak.token &&
			this.#keycloak.refreshToken &&
			this.#keycloak.tokenParsed?.exp
		) {
			localStorage.setItem('access_token', this.#keycloak.token);
			localStorage.setItem('refresh_token', this.#keycloak.refreshToken);
			localStorage.setItem('exp', String(this.#keycloak.tokenParsed.exp));
			this.buildUser();
			return true;
		}
	}

	private buildUser() {
		const parsed = this.#keycloak.tokenParsed;
		if (!parsed) {
			throw new Error('Token parsed is not defined');
		}
		this.#user = {
			userId: parsed['sub'],
			username: parsed['preferred_username'],
			firstname: parsed['given_name'],
			lastname: parsed['family_name'],
			roles: parsed['realm_access']?.['roles'] || []
		};
		this.#observable.next(this.#user);
	}

	private buildInitParams() {
		return {
			token: localStorage.getItem('access_token'),
			refreshToken: localStorage.getItem('refresh_token')
		};
	}

	public getUser(): Observable<User> {
		return this.#observable;
	}

	public login(options: { redirectUri: string }) {
		if (this.#initInProgress) return;
		this.#keycloak.init({ onLoad: 'login-required' });
		this.#keycloak.login(options);
	}

	public logout() {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('exp');
		this.#keycloak.logout();
	}

	public checkParams() {
		const params = new URL(document.location.href.replace('#', '?')).searchParams;
		if (params.get('state') && params.get('session_state') && params.get('code')) {
			this.init(this.buildInitParams());
		}
	}
}
