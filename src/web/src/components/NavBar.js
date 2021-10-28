import { useSelector } from "react-redux";
import { AuthService } from "../services/authService";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    AuthService.logout();
  };
  const loginHandler = () => {
    AuthService.signinRedirect();
  };
  return (
    <nav className="navbar navbar-dark bg-secondary">
      <div className="container-fluid justify-content-end">
        {isLoggedIn ? (
          <button className="btn btn-primary" onClick={logoutHandler}>
            Logout
          </button>
        ) : (
          <button className="btn btn-primary" onClick={loginHandler}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export { NavBar };
