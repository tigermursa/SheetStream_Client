"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUpload, FaEdit, FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { name: "Home", href: "/", icon: <FaHome size={20} /> },
  { name: "Upload File", href: "/upload", icon: <FaUpload size={20} /> },
  { name: "Edit", href: "/edit", icon: <FaEdit size={20} /> },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container  flex justify-start items-center p-4 gap-12">
        {/* Logo Section */}
        <div className="text-3xl font-bold">
          <Link href="/" className="text-primary">
            SheetStream
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="text-2xl lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Items for Desktop */}
        <div className="hidden lg:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 text-sm ${
                isActive(item.href) ? "text-primaryLight" : "text-gray-400 hover:text-primaryDark"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out transform origin-top ${
          menuOpen ? "max-h-[400px] opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col space-y-4 bg-gray-800 p-4">
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
      </div>
    </nav>
  );
};

export default Navbar;
