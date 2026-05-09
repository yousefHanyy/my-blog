import { NavLink } from "react-router";

function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <NavLink to="/">
          <a className="btn btn-ghost text-xl">My Blog</a>
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-lg">
          <NavLink to="/login">
            <li>
              <a>Login / Register</a>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
