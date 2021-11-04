import { AdminApiButton } from "../../components/AdminApiButton";
import { ApiButton } from "../../components/ApiButton";
const ButtonBar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-bottom navbar-dark bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <AdminApiButton/>
          <ApiButton/>
        </div>
      </div>
    </div>
  </nav>
  );
};
export default ButtonBar;

