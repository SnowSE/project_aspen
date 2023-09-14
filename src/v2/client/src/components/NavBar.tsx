import { Link } from "react-router-dom"

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand text-white fw-bold" href="https://sanpetepantry.org/" target="_blank" rel="noreferrer">
          Sanpete Food Bank
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item my-auto border-start border-white px-2">
              <Link to={"/"} className="text-white text-decoration-none">Home</Link>
            </li>
            <li className="nav-item my-auto border-start border-white px-2">
              <Link to={"/"} className="text-white text-decoration-none">Donate</Link>
            </li>
            <li className="nav-item my-auto border-start border-white px-2">
              <Link to={"/"} className="text-white text-decoration-none">Teams</Link>
            </li>
            <li className="nav-item my-auto border-start border-white px-2">
              <Link to={"/"} className="text-white text-decoration-none">Swagger</Link>
            </li>
          </ul>
          <button className="btn btn-info shadow">LOGOUT</button>
        </div>
      </div>
    </nav>
  )
}
