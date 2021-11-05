import { AuthService } from "../services/authService";
import { NavLink } from "react-router-dom";
import { useStoreSelector } from "../store";
import logo from "../tempLogo.png";

const NavBar = () => {
  const isAdmin = useStoreSelector((state) => state.auth.isAdmin);
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
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            className="img-fluid img-thumbnail rounded-circle m-2 p-2"
            alt="logo"
            width="50"
            height="50"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAdmin && (
              <li className="nav-item">
                <NavLink className='btn btn-primary' to="/admin">Admin Page</NavLink>
              </li>
            )}
            <li className="nav-item mx-2">
              <NavLink className='btn btn-primary' to="/pagedata">PageData</NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className='btn btn-primary' to="/person">Person</NavLink>
            </li>
            <li className="nav-item mx-2">
              {isLoggedIn ? (
                <button className="btn btn-primary" onClick={logoutHandler}>
                  Logout
                </button>
              ) : (
                <button className="btn btn-primary" onClick={loginHandler}>
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { NavBar };
