import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PostJob from "./pages/PostJob";
import Navbar from "./components/Navbar";
import { isLoggedIn } from "./auth";
import Footer from "./components/Footer";

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/"
        element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={isLoggedIn() ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/post-job" element={isLoggedIn() ? <PostJob /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    <Footer/>
  </>
);

export default App;