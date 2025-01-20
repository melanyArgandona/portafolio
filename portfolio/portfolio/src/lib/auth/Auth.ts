import { BehaviorSubject } from 'rxjs';
import type { User } from '$lib/auth/User';
import Keycloak, { type KeycloakConfig, type KeycloakTokenParsed } from 'keycloak-js';

const UPDATE_TOKEN_MIN_VALIDITY = 5; //seconds
export class Auth {
  #keycloak!: Keycloak;
  #user;
  #initInProgress = false;
  #options: KeycloakConfig;

  public constructor(options: KeycloakConfig) {
    this.#user = new BehaviorSubject<User | null>(null);
    this.#options = options;
  }

  public inBrowserInit() {
    if (!this.#keycloak) {
      // make sure not to load it twice
      this.#keycloak = new Keycloak(this.#options);
    }
    if (localStorage.getItem('access_token') !== null) {
      // if access token is set, attempt to refresh
      this.init(this.buildInitParams());
    }
  }

  private async init(params?: any) {
    this.#initInProgress = true;
    const authenticated = await this.#keycloak.init(params);
    if (this.storeCredentialsAndBuildUser(authenticated)) {
      this.#keycloak.onTokenExpired = () =>
        this.#keycloak
          .updateToken(UPDATE_TOKEN_MIN_VALIDITY)
          .then(this.storeCredentialsAndBuildUser);
    }
    this.#initInProgress = false;
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
      this.buildUser(this.#keycloak.tokenParsed);
      return true;
    }
  }

  private buildUser(parsed: KeycloakTokenParsed) {
    this.#user.next({
      userId: parsed['sub'],
      username: parsed['preferred_username'],
      firstname: parsed['given_name'],
      lastname: parsed['family_name'],
      avatar: parsed.avatar,
      roles: parsed['realm_access']?.['roles'] || [],
      groups: parsed['groups'] || []
    });
  }

  private buildInitParams() {
    return {
      token: localStorage.getItem('access_token'),
      refreshToken: localStorage.getItem('refresh_token')
    };
  }

  public getUser() {
    return this.#user;
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
