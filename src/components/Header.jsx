import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Navbar start: Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/properties">All Properties</NavLink>
            </li>
            <li>
              <NavLink to="/add-property">Add Property</NavLink>
            </li>
            <li>
              <NavLink to="/my-properties">My Properties</NavLink>
            </li>
            <li>
              <NavLink to="/my-ratings">My Ratings</NavLink>
            </li>
            {!user && (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">Signup</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl">
          HomeNest
        </NavLink>
      </div>

      {/* Navbar center: menu for larger screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/properties">All Properties</NavLink>
          </li>
          <li>
            <NavLink to="/add-property">Add Property</NavLink>
          </li>
          <li>
            <NavLink to="/my-properties">My Properties</NavLink>
          </li>
          <li>
            <NavLink to="/my-ratings">My Ratings</NavLink>
          </li>
        </ul>
      </div>

      {/* Navbar end: Login/Signup or UserDropdown */}
      <div className="navbar-end">
        {!user ? (
          <>
            <NavLink className="btn mr-2" to="/login">
              Login
            </NavLink>
            <NavLink className="btn" to="/signup">
              Signup
            </NavLink>
          </>
        ) : (
          <UserDropdown user={user} />
        )}
      </div>
    </div>
  );
};

export default Header;
