import { Link } from "react-router-dom";
import { useContext } from "react";
import { WalletContext } from "../context/WalletProvider";
import { isLoggedIn } from "../auth";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin
} from "react-icons/fa";

const Footer = () => {
  const { walletAddress } = useContext(WalletContext);

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-gray-400 border-t border-gray-700/40 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">


        <div className="flex flex-col md:flex-row justify-between gap-8">

          <div className="flex-1">
            <h4 className="text-white text-lg font-semibold mb-2">About DevBoard</h4>
            <p className="text-sm text-gray-400 max-w-md">
              DevBoard is a platform for developers to connect, post jobs, and build projects together. Whether you're hiring or looking for work, we're here to support your journey.
            </p>
          </div>


          <div className="flex-1">
            <h4 className="text-white text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
              {isLoggedIn() && <li><Link to="/profile" className="hover:text-white transition">My Profile</Link></li>}
            </ul>
          </div>


          <div className="flex-1">
            <h4 className="text-white text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex gap-4 text-xl">
              <a
                href="https://github.com/your-org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaGithub />
              </a>
              <a
                href="https://twitter.com/your-org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com/company/your-org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>


        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-700 pt-6 text-xs text-gray-500">
          <div>&copy; {new Date().getFullYear()} DevBoard. All rights reserved.</div>
          {walletAddress && (
            <div>
              Connected Wallet:{" "}
              <span className="font-mono text-gray-300">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
