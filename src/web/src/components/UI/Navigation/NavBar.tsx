import { AuthService } from "../../../services/authService";
import { NavLink } from "react-router-dom";
import { useStoreSelector } from "../../../store";

const NavBar = () => {
  const isLoggedIn = useStoreSelector((state) => state.auth.isLoggedIn);
  const userName = useStoreSelector(state => state.auth.user?.profile.given_name)

  const logoutHandler = () => {
    AuthService.logout();
  };
  const loginHandler = () => {
    AuthService.signinRedirect();
  };
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary px-3 py-2">
      <NavLink className="navbar-brand" to="/">PROJECT ASPEN</NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav justify-content-end container-fluid p-0">
          <li className="nav-item text-center text-light">
            {isLoggedIn ? (
              <div className="d-flex align-items-center">
                <p className="m-0 me-3">Welcome back, {userName}!</p>
                <button className="btn btn-primary m-0 " onClick={logoutHandler}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="btn btn-primary m-0" onClick={loginHandler}>
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export { NavBar };
