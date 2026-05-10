import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("Logged out successfully.");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost text-xl">
          My Blog
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-lg items-center gap-4">
          {token ? (
            <>
              <span className="text-sm italic">Hi, {user?.name}</span>

              <div className="fab">
                <NavLink to="/add-post">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-lg btn-circle btn-primary"
                  >
                    <svg
                      aria-label="New"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                </NavLink>
              </div>

              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login">Login / Register</NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
