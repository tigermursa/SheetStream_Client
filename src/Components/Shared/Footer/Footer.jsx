import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 z-40">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">SheetStream</h2>
        <p className="text-sm mb-4">© 2024 Mursalin. All rights reserved.</p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/mursalin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/mursalin"
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
