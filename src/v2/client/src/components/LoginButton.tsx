import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

export const LoginButton = () => {
  const auth = useAuth();
  const [triedLogin, setTriedLogin] = useState(false)

  const loginHandler = () => {
    auth.signinRedirect();
  };
  
  const logoutHandler = () => {
    auth.removeUser();
    auth.signoutRedirect()
  };
  
  useEffect(() => {
    if (!auth.isAuthenticated && !triedLogin)
    {
      auth.signinSilent()
      setTriedLogin(true)
    }
  }, [auth, triedLogin])
  

  if (auth.isAuthenticated) {
    return (
      <button className="btn btn-secondary shadow text-white" onClick={logoutHandler}>Logout</button>
    )
  }

  return (
    <button className="btn btn-secondary shadow text-white" onClick={loginHandler}>Login</button>
  );
};
