import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './../context/AuthContext';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log('Successful sign out');
      })
      .catch((error) => {
        console.log("Failed to sign out. Stay here. Don't leave me alone");
      });
  };

  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/services">Services</Link>
      </li>
      <li>
        <details>
          <summary>Dashboard</summary>
          <ul className="p-2">
            <li>
              <Link to="/addService" className="block p-2 hover:bg-gray-200">
                Add a New Service
              </Link>
            </li>
            <li>
              <Link
                to="/bookedServices"
                className="block p-2 hover:bg-gray-200"
              >
                Manage Services
              </Link>
            </li>
            <li>
              <Link
                to="/viewServiceBookingApplications"
                className="block p-2 hover:bg-gray-200"
              >
                Service To Do
              </Link>
            </li>
          </ul>
        </details>
      </li>
    </>
  );

  return (
    <nav>
      <div className="navbar bg-base-100 shadow-sm">
        {/* Left Side */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box absolute mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <div className="flex btn items-center">
            <img
              className="w-[60px] h-auto rounded-full"
              src="https://i.ibb.co/gLzZFk9R/homecare-solutions-logo.jpg"
              alt="Homecare Solutions Logo"
            />
            <h2 className="font-bold text-xl ">Homecare Solutions</h2>
          </div>
        </div>

        {/* Center Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* Right Side (Auth) */}
        <div className="navbar-end flex items-center">
          {!user ? (
            <>
              <Link to="/register" className="btn btn-primary mr-2">
                Register
              </Link>
              <Link to="/signin" className="btn btn-secondary">
                Log In
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <button onClick={handleSignOut} className="btn">
                Log Out
              </button>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border"
                />
              ) : (
                <span className="font-bold">{user.displayName || 'User'}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
