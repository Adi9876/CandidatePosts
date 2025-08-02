import { Link } from "react-router-dom";
import { isLoggedIn, logout } from "../auth";

const Navbar = () => (
  <nav className="p-4 bg-gray-800 text-white flex justify-between">
    <div className="flex gap-4">
      <Link to="/">Dashboard</Link>
      {isLoggedIn() && (
        <>
          <Link to="/post-job">Post Job</Link>
          <Link to="/profile">Profile</Link>
        </>
      )}
    </div>
    <div>
      {isLoggedIn() ? (
        <button onClick={logout} className="underline">
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  </nav>
);

export default Navbar;
