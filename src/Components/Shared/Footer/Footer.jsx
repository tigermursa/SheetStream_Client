import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 z-40 border-t pt-10">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2 text-[#70ad29]">SheetStream</h2>
        <p className="text-sm mb-4">© 2024 Mursalin Hossain. All rights reserved.</p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/tigermursa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/mursalin77/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
