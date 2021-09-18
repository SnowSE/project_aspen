import { useContext } from "react"
import { AuthContext } from "../store/AuthContext"

const NavBar = () => {
  const context = useContext(AuthContext)

  const logoutHandler = () => {
    context.logout();
  }
  return (
    <nav className="navbar navbar-dark bg-secondary">
      <div className="container-fluid justify-content-end">
        <button className="btn btn-primary" onClick={logoutHandler}>Logout</button>
      </div>
    </nav>

  )
}

export { NavBar }