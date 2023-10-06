import { User, WebStorageStateStore } from "oidc-client-ts";

const onSigninCallback = (_user: User | void): void => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

const authUrl = process.env.REACT_APP_AUTH_URL;
export const oidcConfig = {
  userStore: new WebStorageStateStore({ store: localStorage }),
  authority: `${
    authUrl || "https://engineering.snow.edu/aspen/auth"
  }/realms/aspen/`,
  client_id: "aspen-web",
  redirect_uri: window.location.origin,
  post_logout_redirect_uri: window.location.origin,
  silent_redirect_uri: window.location.origin + "/hose",
  response_type: "code",
  scope: "openid profile email",
  loadUserInfo: true,
  automaticSilentRenew: true,
  onSigninCallback: onSigninCallback,
};
