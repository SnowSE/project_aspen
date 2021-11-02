import { useSelector } from "react-redux";
import { AuthService } from "../services/authService";
import { NavLink } from "react-router-dom";

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
        <NavLink to ="/admin">Admin Page </NavLink>
        <NavLink to="/pagedata">PageData</NavLink>
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
