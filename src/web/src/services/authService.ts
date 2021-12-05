// import Oidc from "oidc-client";
import { UserManager, WebStorageStateStore } from "oidc-client";

// Oidc.Log.logger = console;
// Oidc.Log.level = Oidc.Log.ERROR;
if(!process.env.REACT_APP_AUTH_URL) throw Error('REACT_APP_AUTH_URL not set')
const authUrl = process.env.REACT_APP_AUTH_URL

const reactAppPath = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "";

console.log("my url is", window.location.origin + reactAppPath)

const userManager = new UserManager({
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  authority:
    `${authUrl}/realms/aspen/.well-known/openid-configuration`,
  client_id: "aspen-web",
  redirect_uri: window.location.origin + reactAppPath + "/login/landing",
  post_logout_redirect_uri: window.location.origin + reactAppPath + "/logout/post",
  silent_redirect_uri: window.location.origin + reactAppPath + "/login/silent",
  response_type: "code",
  scope: "openid profile email",
  loadUserInfo: true,
  automaticSilentRenew: true,
});
userManager.startSilentRenew();

// const parseJwt = (token) => {
//   const base64Url = token.split(".")[1];
//   const base64 = base64Url.replace("-", "+").replace("_", "/");
//   return JSON.parse(window.atob(base64));
// }

export const AuthService = {
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
    console.log(window.location.pathname)
    if(window.location.pathname === '/aspen/' || window.location.pathname === '/aspen')
    {
      localStorage.setItem("redirectUri", '/');
    }
    else
    {
      localStorage.setItem("redirectUri", window.location.pathname);
    }
    await userManager.signinRedirect();
  },

  signinRedirectCallback: async () => {
    const desiredDestination = localStorage.getItem("redirectUri");
    const tempDestination = desiredDestination?.replace(reactAppPath, '');
    const user = await userManager.signinRedirectCallback();
    
    return { desiredDestination: tempDestination, user };
  },

  signinSilent: async () => {
    await userManager
      .signinSilent()
      .then((user) => {
        console.log("signed in", user);
      })
      .catch((err) => {
        console.log(err);
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
    // await userManager.signoutRedirect({
    //   id_token_hint: localStorage.getItem("id_token"),
    // });
  },

  signoutRedirectCallback: async () => {
    await userManager.signoutRedirectCallback().then(() => {
      localStorage.clear();
      window.location.replace(reactAppPath);
    });
    await userManager.clearStaleState();
  },
};

userManager.events.addSilentRenewError((e) => {
  console.log("silent renew error", e.message);
});

userManager.events.addAccessTokenExpired(() => {
  console.log("token expired");
  AuthService.signinSilent();
});
