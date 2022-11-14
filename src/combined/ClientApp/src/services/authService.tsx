import { UserManager, WebStorageStateStore } from "oidc-client";

const authUrl = process.env.REACT_APP_AUTH_URL

const userManager = new UserManager({
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  authority:
    `${authUrl}/realms/aspen/.well-known/openid-configuration`,
  client_id: "aspen-web",
  redirect_uri: window.location.origin + "/aspen/new/landing",
  post_logout_redirect_uri: window.location.origin + "/aspen/new/",
  silent_redirect_uri: window.location.origin + "/login",
  response_type: "code",
  scope: "openid profile email",
  loadUserInfo: true,
  automaticSilentRenew: true,
});
userManager.startSilentRenew();

export const authService = {

  getUser: async () => {
    const user = await userManager.getUser();
    return user;
  },

  isLoggedIn: async () => {
    const user = await userManager.getUser();
    const loggedIn = user !== null && !user.expired;
    return loggedIn;
  },

  signinRedirect: async () => {
    console.log("window.location.origin is: ", window.location.pathname)
    if (window.location.pathname === '/aspen/' || window.location.pathname === '/aspen') {
      localStorage.setItem("redirectUri", '/');
    }
    else {
      localStorage.setItem("redirectUri", window.location.pathname);
    }
    await userManager.signinRedirect();
  },

  signinRedirectCallback: async () => {
    const desiredDestination = localStorage.getItem("redirectUri");
    const tempDestination = desiredDestination?.replace('/login', '/');
    const user = await userManager.signinRedirectCallback();

    return { desiredDestination: tempDestination, user };
  },

  signinSilent: async () => {
    await userManager
      .signinSilent()
      .then((user) => {
      })
      .catch((err) => {
      });
  },

  signinSilentCallback: async () => {
    return await userManager.signinSilentCallback();
  },

  createSigninRequest: async () => {
    return await userManager.createSigninRequest();
  },

  logout: async () => {
    await userManager.clearStaleState();
    await userManager.signoutRedirect();
    localStorage.setItem("LoggedInUser","")
    localStorage.setItem("access_token","")

    // await userManager.signoutRedirect({
    //   id_token_hint: localStorage.getItem("id_token"),
    // });
  },

  signoutRedirectCallback: async () => {
    await userManager.signoutRedirectCallback().then(() => {
      localStorage.clear();
      window.location.replace('/');
    });
    await userManager.clearStaleState();
  },

}

userManager.events.addSilentRenewError((e) => {
});

userManager.events.addAccessTokenExpired(() => {
  authService.signinSilent();
});