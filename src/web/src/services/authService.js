import Oidc from 'oidc-client';
import { UserManager, WebStorageStateStore, Log } from "oidc-client";
import autoBind from 'auto-bind'

Oidc.Log.logger = console;
// Oidc.Log.level = Oidc.Log.INFO;
Oidc.Log.level = Oidc.Log.ERROR;


const reactAppUrl = process.env.REACT_APP_PUBLIC_URL;

const userManager = new UserManager({
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  authority: 'http://localhost:4000/auth/realms/master/.well-known/openid-configuration',
  client_id: 'react-app',
  redirect_uri: window.location.href + '?login=callback',
  silent_redirect_uri: window.location.origin + '?login=silentrenew',
  response_type: 'code',
  scope: 'openid profile email',
  loadUserInfo: true,
  automaticSilentRenew: true
});
userManager.startSilentRenew()

// https://medium.com/@franciscopa91/how-to-implement-oidc-authentication-with-react-context-api-and-react-router-205e13f2d49
export default class AuthService {

  constructor() {
    autoBind(this)
    // Logger
    Log.logger = console;
    Log.level = Log.DEBUG;
    // userManager.events.addUserLoaded((user) => {
    //   if (window.location.href.indexOf("signin-oidc") !== -1) {
    //     this.navigateToScreen();
    //   }
    // });
    userManager.events.addSilentRenewError((e) => {
      console.log("silent renew error", e.message);
    });

    userManager.events.addAccessTokenExpired(() => {
      console.log("token expired");
      this.signinSilent();
    });
  }


  async getUser() {
    const user = await userManager.getUser();
    // console.log('got user', user)
    if (!user) {
      return await userManager.signinRedirectCallback();
    }
    return user;
  };

  async isLoggedIn() {
    const user = await userManager.getUser();
    const loggedIn = (user !== null && !user.expired);
    return loggedIn;
  };

  parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };


  async signinRedirect() {
    localStorage.setItem("redirectUri", window.location.pathname);
    await userManager.signinRedirect();
  };

  async signinRedirectCallback() {
    const dest = localStorage.getItem("redirectUri")
    await userManager.signinRedirectCallback()
    window.location = dest
  };


  navigateToScreen() {
    window.location.replace("/en/dashboard");
  };

  signinSilent() {
    userManager.signinSilent()
      .then((user) => {
        console.log("signed in", user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async signinSilentCallback() {
    await userManager.signinSilentCallback();
  };

  async createSigninRequest() {
    return await userManager.createSigninRequest();
  };

  async logout() {
    await userManager.signoutRedirect({
      id_token_hint: localStorage.getItem("id_token")
    });
    await userManager.clearStaleState();
  };

  async signoutRedirectCallback() {
    await userManager.signoutRedirectCallback().then(() => {
      localStorage.clear();
      window.location.replace(reactAppUrl);
    });
    await userManager.clearStaleState();
  };

  async ensureLoggedIn() {
    const query = new URLSearchParams(window.location.search);
    const login = query.get('login');
    if (login === "callback") {
      await this.signinRedirectCallback();
    }
    if (login === "silentrenew") {
      await this.signInSilent();
    }

    const isLoggedIn = await this.isLoggedIn();
    if (!isLoggedIn) {
      this.signinRedirect();
      // return { success: false, message: "Sending to Login Redirect" };
    } else {
      return await userManager.getUser();
    }
  };
}