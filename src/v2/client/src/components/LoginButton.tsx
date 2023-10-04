import { authService } from "../services/authService";

export const LoginButton = () => {
  const loginHandler = () => {
    authService.signinRedirect();
  };
  const logoutHandler = () => {
    authService.logout();
  };


  return (
    <>
      {localStorage.getItem("LoggedInUser") === "" ? (
        <button className="btn btn-secondary shadow text-white" onClick={loginHandler}>Login</button>
      ) : (
        <button className="btn btn-secondary shadow text-white" onClick={logoutHandler}>Logout</button>
      )}
    </>
  );
};
