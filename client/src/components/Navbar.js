import React, { useState } from "react";
import logo from "../Assets/logo.png";
import { useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <div className="container mx-auto px-6 md:px-10">
        {/* Navbar Header */}
        <div className="flex justify-between items-center h-16">
          {/* Desktop Navigation Left */}
          <div className="hidden lg:flex space-x-6">
            {["Home", "Chat", "About"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`relative px-6 py-2 font-medium text-md border-2 rounded-3xl transition-all duration-300 ease-in-out ${
                  location.pathname === `/${item.toLowerCase()}`
                    ? "after:content-['-'] after:text-white after:absolute after:left-2 after:top-1/2 after:-translate-y-1/2 after:text-2xl"
                    : ""
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src={logo}
              alt="Chatorita logo"
              className="h-12 w-auto mr-3 drop-shadow-lg"
            />
            <span className="text-xl font-bold tracking-wider drop-shadow-lg">
              CHATORITA
            </span>
          </a>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-200 p-2 rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <svg
              className="h-7 w-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Desktop Navigation Right */}
          {/* Desktop Navigation Right */}
          <div className="hidden lg:flex space-x-6">
            {["Profile", "Contact"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`relative px-6 py-2 font-medium text-md border-2 rounded-3xl transition-all duration-300 ease-in-out ${
                  location.pathname === `/${item.toLowerCase()}`
                    ? "after:content-['-'] after:text-white after:absolute after:left-2 after:top-1/2 after:-translate-y-1/2 after:text-2xl"
                    : ""
                }`}
              >
                {item}
              </a>
            ))}
            <button
              onClick={handleLogout}
              className="relative px-6 py-2 font-medium text-md border-2 rounded-3xl transition-all duration-300 ease-in-out "
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="lg:hidden mt-4 bg-white bg-opacity-10 rounded-lg shadow-md">
            <ul className="space-y-4 p-6 text-center">
              {["Home", "Chat", "Register", "Login"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase()}`}
                    className="block py-2 text-lg font-medium hover:text-gray-300 transition duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
