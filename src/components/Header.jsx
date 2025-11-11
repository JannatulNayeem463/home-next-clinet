import { NavLink } from "react-router-dom";
import "./header.css"
import UserDropdown from "./UserDropdown";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

 
  return (

    <div className="navbar  shadow-sm">
      {/* Navbar start*/}
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
        Home<span className="text-blue-400  font-extrabold">Nest</span>
        </NavLink>
      </div>

      {/* Navbar center*/}
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

      {/* Navbar end */}
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
   
      <div className="flex justify-end p-4">
          <button
            onClick={toggleTheme}
            className="px-3 py-3 rounded-full bg-gray-800 text-white dark:bg-gray-300 dark:text-black transition-colors"
          >
            {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
          </button>
        </div>

    </div>
  );
};

export default Header;
