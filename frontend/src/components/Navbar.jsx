import { Link, useLocation } from "react-router-dom";
import { isLoggedIn, logout } from "../auth";
import { WalletContext } from "../context/WalletProvider";
import { useContext } from "react";

const Navbar = () => {
  const { walletAddress, connectWallet, disconnectWallet } = useContext(WalletContext);
  const location = useLocation();

  const navLinkStyle = (path) =>
    `transition-all duration-200 px-3 py-2 rounded-lg text-sm font-medium ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:text-white hover:bg-gray-700/30"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-br from-gray-900/80 to-gray-800/70 backdrop-blur-md border-b border-gray-700/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-10">
            <Link
              to="/"
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
            >
              DevBoard
            </Link>

            {isLoggedIn() && (
              <div className="hidden sm:flex gap-2">
                <Link to="/" className={navLinkStyle("/")}>Dashboard</Link>
                <Link to="/post-job" className={navLinkStyle("/post-job")}>Jobs</Link>
                <Link to="/profile" className={navLinkStyle("/profile")}>My Profile</Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isLoggedIn() ? (
              <>
                <Link to="/login" className="text-sm text-gray-300 hover:text-white transition">
                  Login
                </Link>
                <Link to="/register" className="text-sm text-gray-300 hover:text-white transition">
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="text-sm text-gray-300 hover:text-red-400 transition"
              >
                Logout
              </button>
            )}

            <button
              onClick={walletAddress ? disconnectWallet : connectWallet}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800
                         text-white px-4 py-2 rounded-full text-xs font-medium tracking-wide
                         transition-all duration-200 shadow hover:shadow-xl"
            >
              {walletAddress
                ? `Wallet: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : "Connect Wallet"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
