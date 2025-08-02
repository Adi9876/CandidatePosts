import { Link } from "react-router-dom";
import { isLoggedIn, logout } from "../auth";
import { WalletContext } from "../context/WalletProvider";
import { useContext } from "react";

const Navbar = () => {
  const { walletAddress, connectWallet } = useContext(WalletContext);

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/">Dashboard</Link>
        {isLoggedIn() && (
          <>
            <Link to="/post-job">Post Job</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        {isLoggedIn() ? (
          <button onClick={logout} className="underline">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="underline">
              Login
            </Link>
            <Link to="/register" className="underline">
              Register
            </Link>
          </>
        )}
        <button
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          {walletAddress
            ? `Connected: ${walletAddress.slice(0, 6)}...`
            : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
