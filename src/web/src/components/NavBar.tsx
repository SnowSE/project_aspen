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
    <nav className="navbar navbar-dark bg-secondary row p-3 ">
      <div className="container-fluid justify-content-start col ">
        <img
          src={logo}
          className="img-fluid img-thumbnail rounded-circle m-2 p-2"
          alt="logo"
          width="100"
          height="100"
        />
      </div>
      <div className="container-fluid justify-content-end col">
        {isAdmin ? (
          <NavLink
            className="border border-primary rounded p-2 bg-primary text-light m-1"
            activeClassName="border border-primary rounded p-2 bg-light text-dark m-1"
            to="/admin"
          >
            Admin Page
          </NavLink>
        ) : (
          <div></div>
        )}
        <NavLink
          className="border border-primary rounded p-2 bg-primary text-light m-1"
          activeClassName="border border-primary rounded p-2 bg-light text-dark m-1"
          to="/pagedata"
        >
          PageData
        </NavLink>
        <NavLink
          className="border border-primary rounded p-2 bg-primary text-light m-1"
          activeClassName="border border-primary rounded p-2 bg-light text-dark m-1"
          to="/person"
        >
          Person
        </NavLink>
        {isLoggedIn ? (
          <button className="btn btn-primary m-1" onClick={logoutHandler}>
            Logout
          </button>
        ) : (
          <button className="btn btn-primary m-1" onClick={loginHandler}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export { NavBar };
