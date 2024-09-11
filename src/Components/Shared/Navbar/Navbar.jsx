"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUpload, FaEdit } from "react-icons/fa";

const navItems = [
  { name: "Home", href: "/", icon: <FaHome size={20} /> },
  { name: "Upload File", href: "/upload", icon: <FaUpload size={20} /> },
  { name: "Edit", href: "/edit", icon: <FaEdit size={20} /> },
];

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-gray-800 text-white flex justify-around items-center p-4 shadow-md">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center space-x-2 ${
            isActive(item.href) ? "text-[#70ad29]" : "text-gray-400"
          }`}
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
