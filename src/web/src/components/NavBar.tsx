import { AuthService } from "../services/authService";
import { NavLink } from "react-router-dom";
import { useStoreSelector } from "../store";
import logo from "../tempLogo.png";

const NavBar = () => {
  const isLoggedIn = useStoreSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    AuthService.logout();
  };
  const loginHandler = () => {
    AuthService.signinRedirect();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img
            src={logo}
            className="img-fluid img-thumbnail rounded-circle m-2 p-2"
            alt="logo"
            width="50"
            height="50"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav justify-content-center container">
            <li className="nav-item mx-2 p-1 text-center text-light">
              <NavLink className="text-white" to="/register">
                Register
              </NavLink>
            </li>
          </ul>
          {isLoggedIn ? (
            <button className="btn btn-primary me-2" onClick={logoutHandler}>
              Logout
            </button>
          ) : (
            <button className="btn btn-primary me-2" onClick={loginHandler}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export { NavBar };
