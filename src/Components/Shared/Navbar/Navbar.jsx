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
  FaUser,
} from "react-icons/fa";
import ButtonToggleLightAndDark from "@/Components/Ui/Buttons/ButtonToggleLightAndDark";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Home", href: "/", icon: <FaHome size={20} /> },
  { name: "Upload File", href: "/upload", icon: <FaUpload size={20} /> },
  { name: "Edit", href: "/edit", icon: <FaEdit size={20} /> },
  { name: "About", href: "/about", icon: <FaInfoCircle size={20} /> },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // To manage dropdown visibility
  const user = useAuth();
  const router = useRouter(); // For navigation

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    // Clear sessionStorage and cookie
    sessionStorage.clear();
    document.cookie =
      "access_token=; path=/; max-age=0; secure=true; samesite=strict;";

    // Navigate to login page
    router.push("/auth/login");
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="flex items-center justify-between ms-5 me-5">
        <div className="container flex justify-start items-center p-4 gap-12">
          <div className="w-full lg:w-auto flex justify-between items-center ">
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
                className={`flex items-center space-x-2 text-sm ${
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
        {/* Dark mode button component */}
        <div className="hidden md:block ">
          <div className="flex gap-4">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility
            >
              <FaUser />
              <p className="text-white font-bold">{user?.username}</p>
            </div>
            <ButtonToggleLightAndDark />
          </div>
        </div>
      </div>

      {/* Dropdown Menu for User */}
      {dropdownOpen && (
        <div className="absolute right-5 bg-gray-700 text-white shadow-lg rounded-lg mt-2 w-48 p-4 z-30">
          <div className="flex flex-col space-y-2">
            <p className="font-bold">{user?.username}</p>
            <p className="text-sm">{user?.email}</p>
            <button
              onClick={handleLogout}
              className="text-red-500 text-sm mt-4 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out transform origin-top ${
          menuOpen
            ? "max-h-[400px] opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col space-y-4 bg-gray-800 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 ${
                isActive(item.href) ? "text-[#70ad29]" : "text-gray-400"
              }`}
              onClick={() => setMenuOpen(false)} // Close menu on click
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        {/* Dark mode button component */}
        <div className="md:hidden p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <FaUser />
            <p className="text-white font-bold">{user?.username}</p>
          </div>

          <ButtonToggleLightAndDark />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
