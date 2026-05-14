import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("Logged out successfully.");
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <div className="bg-[#fff8f5] border-b-2 border-[#1d1b19]">
      <div className="px-4 md:px-60 py-0">
        <div className="h-16 flex gap-3 items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-[#43643d] font-bold text-lg md:text-2xl uppercase tracking-tight shrink-0"
          >
            PixelPulp
          </NavLink>

          {/* Hamburger Menu - Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#43643d] hover:bg-gray-200 rounded"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          {/* Desktop Account */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <>
                <span className="text-xs italic text-gray-600">
                  Hi, {user?.name}
                </span>
                <NavLink
                  to="/add-post"
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  title="New Post"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 text-[#43643d]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-xs px-3 py-1 border border-[#43643d] text-[#43643d] rounded hover:bg-[#43643d] cursor-pointer hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="text-xs px-3 py-1 border border-[#43643d] text-[#43643d] rounded hover:bg-[#43643d] cursor-pointer hover:text-white transition-colors"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-[#1d1b19]">
            <div className="flex flex-col gap-3 pt-4">
              {token ? (
                <>
                  <span className="text-xs italic text-gray-600 px-2">
                    Hi, {user?.name}
                  </span>
                  <NavLink
                    to="/add-post"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-sm text-[#43643d] font-['Liberation_Serif'] font-bold leading-5 hover:bg-gray-100 px-2 py-2 rounded transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    New Post
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="text-sm px-3 py-2 border  border-[#43643d] text-[#43643d] rounded hover:bg-[#43643d] hover:text-white transition-colors text-center cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm px-3 py-2 border border-[#43643d] text-[#43643d] rounded hover:bg-[#43643d] hover:text-white transition-colors text-center"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
