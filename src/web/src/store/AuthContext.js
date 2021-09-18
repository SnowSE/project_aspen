import { createContext } from "react";
import AuthService from "../services/authService";

const authService = new AuthService();

const AuthContext = createContext({
  signinRedirectCallback: () => ({}),
  logout: () => ({}),
  signoutRedirectCallback: () => ({}),
  // isAuthenticated: () => ({}),
  signinRedirect: () => ({}),
  signinSilentCallback: () => ({}),
  createSigninRequest: () => ({}),
  ensureLoggedIn: () => ({}),
  getUser: () => ({}),
});

const AuthContextProvider = (props) => {
  return (
    <AuthContext.Provider value={authService}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };