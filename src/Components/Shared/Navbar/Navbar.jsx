"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome, FaUpload, FaEdit } from "react-icons/fa";

const Navbar = () => {
  const { pathname } = useRouter();

  return (
    <nav className="bg-gray-800 text-white flex justify-around items-center p-4 shadow-md">
      <Link
        href="/"
        className={`flex items-center space-x-2 ${
          pathname === "/" ? "text-yellow-300" : ""
        }`}
      >
        <FaHome size={20} />
        <span>Home</span>
      </Link>
      <Link
        href="/upload"
        className={`flex items-center space-x-2 ${
          pathname === "/upload" ? "text-yellow-300" : ""
        }`}
      >
        <FaUpload size={20} />
        <span>Upload</span>
      </Link>
      <Link
        href="/edit"
        className={`flex items-center space-x-2 ${
          pathname === "/edit" ? "text-yellow-300" : ""
        }`}
      >
        <FaEdit size={20} />
        <span>Edit</span>
      </Link>
    </nav>
  );
};

export default Navbar;
