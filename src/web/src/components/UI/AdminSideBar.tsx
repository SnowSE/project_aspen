import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div className="flex-shrink-0 p-3 bg-white">
      <span className="fs-5 fw-semibold">Admin Tools</span>
      <ul className="list-unstyled ps-0">
        <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#home-collapse"
            aria-expanded="false"
          >
            Events
          </button>
          <div className="collapse" id="home-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <NavLink to="/admin/createEvent" className="link-dark rounded">
                  Create an Event
                </NavLink>
              </li>
              <li>
                <NavLink className="link-dark rounded" to="/admin/events">
                  Manage your Events
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
