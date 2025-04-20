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

  // ✅ Dummy ID for now (replace with dynamic logic later if needed)
  const service_id = '12345';

  return (
    <nav>
      <div className="navbar bg-base-100 shadow-sm">
        {/* Left Side */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/allServices">Services</Link>
              </li>
              <li>
                <details>
                  <summary>Dashboard</summary>
                  <ul className="p-2">
                    <li>
                      <Link to="/addService">Add a New Service</Link>
                    </li>
                    <li>
                      <Link to="/bookedServices">Manage Services</Link>
                    </li>
                    <li>
                      <Link to={`/viewBooking/${service_id}`}>
                        View Booking
                      </Link>
                    </li>
                    <li>
                      <Link to="/myBookings">
                        My Booked Services
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <div className="flex items-center space-x-2 btn btn-ghost">
            <img
              className="w-[60px] h-auto rounded-full"
              src="https://i.ibb.co/gLzZFk9R/homecare-solutions-logo.jpg"
              alt="Homecare Solutions Logo"
            />
            <h2 className="font-bold text-xl">Homecare Solutions</h2>
          </div>
        </div>

        {/* Center Nav - Desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/allServices">Services</Link>
            </li>
            <li className="dropdown dropdown-hover dropdown-end">
              <div tabIndex={0} role="button" className="">
                Dashboard
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/addService">Add a New Service</Link>
                </li>
                <li>
                  <Link to="/bookedServices">Manage Services</Link>
                </li>
                <Link to={`/viewBooking/${service_id}`}>View Booking</Link>
              </ul>
            </li>
          </ul>
        </div>

        {/* Right Side - Auth Controls */}
        <div className="navbar-end flex items-center space-x-3">
          {!user ? (
            <>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
              <Link to="/signin" className="btn btn-secondary">
                Log In
              </Link>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
