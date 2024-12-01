import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { HiOutlineArrowUturnLeft } from "react-icons/hi2";
import { AiOutlineLogin } from "react-icons/ai";
import { CiPen } from "react-icons/ci";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { session, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolling(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => logout();

  return (
    <header
      className={`${isScrolling ? "shadow-lg bg-blue-600 py-2" : "bg-blue-500"
        } text-white sticky top-0 z-20 transition-all duration-300`}
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <NavLink className="block" to="/">
            <span className="sr-only">Home</span>
            <svg
              className="h-8"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78..."
                fill="currentColor"
              />
            </svg>
          </NavLink>

          <div className="flex items-center gap-4">
            {/* Desktop Menu */}
            <nav className="hidden md:flex md:items-center gap-6">
              <NavLink className="hover:text-gray-300" to="/">
                Home
              </NavLink>
              <NavLink className="hover:text-gray-300" to="product">
                Products
              </NavLink>
              <NavLink className="hover:text-gray-300" to="categories">
                Categories
              </NavLink>
            </nav>

            {/* Profile & Auth Actions */}
            <div className="hidden md:block relative">
              <button
                type="button"
                className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="w-10 h-10 object-cover"
                />
              </button>

              {profileOpen && (
                <div
                  className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                  role="menu"
                >
                  <div className="p-2">
                    {session.session_id ? (
                      <>
                        <NavLink
                          to="profile"
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          role="menuitem"
                        >
                          My profile
                        </NavLink>

                        <NavLink
                          to="cart"
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          role="menuitem"
                        >
                          My Cart
                        </NavLink>

                        <NavLink
                          to={'orders'}
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          role="menuitem"
                        >
                          My Orders
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <span className="block rounded-lg px-4 py-2 text-sm text-gray-500">
                          Welcome, Guest!
                        </span>
                      </>
                    )}
                  </div>

                  <div className="p-2">
                    {session.session_id ? (
                      <button
                        type="submit"
                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                        role="menuitem"
                        onClick={handleLogout}
                      >
                        <HiOutlineArrowUturnLeft />
                        Logout
                      </button>
                    ) : (
                      <>
                        <NavLink
                          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                          to={'login'}
                          role="menuitem"
                        >
                          <AiOutlineLogin />
                          Login
                        </NavLink>
                        <NavLink
                          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
                          to={'register'}
                          role="menuitem"
                        >
                          <CiPen />
                          Register
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <nav className="md:hidden">
          <NavLink
            className="block px-4 py-2 hover:bg-gray-200"
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            className="block px-4 py-2 hover:bg-gray-200"
            to="product"
            onClick={() => setIsOpen(false)}
          >
            Products
          </NavLink>
          <NavLink
            className="block px-4 py-2 hover:bg-gray-200"
            to="categories"
            onClick={() => setIsOpen(false)}
          >
            Categories
          </NavLink>
          <NavLink
            className="block px-4 py-2 hover:bg-gray-200"
            to="profile"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </NavLink>
        </nav>
      )}
    </header>
  );
};
