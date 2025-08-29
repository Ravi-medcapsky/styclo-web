import React, { useState } from "react";
import Logo from "../assets/logo/logo1.png";
import { IoMdSearch, IoMdMenu, IoMdClose } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import SearchBar from "./SearchBar";

const Menu = [
  <SearchBar />,
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Women Wear", link: "/women" },
  { id: 3, name: "Men Wear", link: "/men" },
  { id: 4, name: "Kids Wear", link: "/kids" },
];

const DropdownLinks = [
  { id: 1, name: "Trending Products", link: "/trending" },
  { id: 2, name: "Best Selling", link: "/best-seller" },
  { id: 3, name: "Top Rated", link: "/top-rated" },
];

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileQuery, setMobileQuery] = useState("");

  return (
    <div className="shadow-md bg-white duration-200 relative z-40  !top-0">
      {/* Top Bar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <div>
            <NavLink
              to="/"
              className="font-bold text-2xl sm:text-3xl flex gap-2"
            >
              <img src={Logo} alt="Logo" className="w-10" />
              Styqlo
            </NavLink>
          </div>

          {/* Search, Order, Login, Menu */}
          <div className="flex justify-between items-center gap-4">
            {/* Search */}
            <SearchBar />

            {/* Order Button */}
            <button
              onClick={() => navigate("/cart")}
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Order
              </span>
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>

            {/* Login Button */}
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-[#fea928] to-[#ed8900] transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Login
              </span>
              <FiLogIn className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white p-2 rounded-full sm:hidden"
            >
              {mobileMenuOpen ? (
                <IoMdClose className="text-xl" />
              ) : (
                <IoMdMenu className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <div data-aos="zoom-in" className="justify-center hidden sm:flex">
        <ul className="flex items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <NavLink
                to={data.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {data.name}
              </NavLink>
            </li>
          ))}
          {/* Dropdown */}
          <li className="group relative cursor-pointer">
            <NavLink to="#" className="flex items-center gap-[2px] py-2">
              Trending Products
              <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
            </NavLink>
            <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <NavLink
                      to={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                    >
                      {data.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white shadow-md px-4 py-3">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={mobileQuery}
              onChange={(e) => setMobileQuery(e.target.value)}
              placeholder="Search"
              className="w-full rounded-full border border-gray-300 px-3 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              aria-label="Search"
              className="p-2 rounded-full bg-primary text-white"
              onClick={() => {
                const q = mobileQuery.trim();
                if (!q) return;
                navigate(`/search?q=${encodeURIComponent(q)}`);
                setMobileMenuOpen(false); // Optional: close menu after search
              }}
            >
              <IoMdSearch />
            </button>
          </div>
          <ul className="flex flex-col gap-3">
            {Menu.map((data) => (
              <li key={data.id}>
                <NavLink
                  to={data.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-primary"
                >
                  {data.name}
                </NavLink>
              </li>
            ))}
            {DropdownLinks.map((data) => (
              <li key={data.id}>
                <NavLink
                  to={data.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-primary"
                >
                  {data.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
