import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from './../context/AuthContext';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("successful sign out");
      })
      .catch((error) => {
        console.log("failed to sign out .stay here. dont leave me alone");
      });
  };

  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <a>Item 2</a>
      </li>
      <li>
      <Link to="">My Booked Services</Link>
      </li>
    </>
  );

  return (
    <nav>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <h1>Homecare Solutions</h1>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button onClick={handleSignOut} className="btn">
              Log Out
            </button>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
              <Link to="/signin">
                <button className="btn btn-primary ml-5">Log In</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;