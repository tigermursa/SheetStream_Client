"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaUpload,
  FaEdit,
  FaBars,
  FaTimes,
  FaInfoCircle,
} from "react-icons/fa";
import ButtonToggleLightAndDark from "@/Components/Ui/Buttons/ButtonToggleLightAndDark";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/Components/Ui/Loader/Loader";
import ErrorUI from "@/Components/Ui/Error/ErrorUI";
import { BiUserCircle } from "react-icons/bi";
const navItems = [
  { name: "Home", href: "/", icon: <FaHome size={20} /> },
  { name: "Upload File", href: "/upload", icon: <FaUpload size={20} /> },
  { name: "Edit", href: "/edit", icon: <FaEdit size={20} /> },
  { name: "About", href: "/about", icon: <FaInfoCircle size={20} /> },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, isLoading, isError } = useAuth();
  console.log(user);

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <ErrorUI />
      </div>
    );
  }

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="flex items-center justify-between ms-5 me-5">
        <div className="container  flex justify-start items-center p-4 gap-12">
          <div className="w-full lg:w-auto flex justify-between  items-center ">
            {/* Logo Section */}
            <div className="text-3xl font-bold">
              <Link href="/" className="text-primary">
                SheetStream
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="text-2xl lg:hidden "
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Navigation Items for Desktop */}
          <div className="hidden lg:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2  text-sm ${
                  isActive(item.href)
                    ? "text-primaryLight"
                    : "text-gray-400 hover:text-primaryDark"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
        {/* dark mood button component */}
        <div className="hidden md:block border border-red-600">
          <div className="flex items-center gap-5">
            <ButtonToggleLightAndDark  />
            <div className="flex">
            <BiUserCircle size={20}/>
              <h4>{user?.userName}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all  duration-300 ease-in-out transform origin-top ${
          menuOpen
            ? "max-h-[400px] opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col space-y-4 bg-gray-800 p-4 ">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex  items-center space-x-2 ${
                isActive(item.href) ? "text-[#70ad29] " : "text-gray-400 "
              }`}
              onClick={() => setMenuOpen(false)} // Close menu on click
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        {/* dark mood button component */}
        <div className=" md:hidden p-4 border border-red-600 ">
          <ButtonToggleLightAndDark />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
