import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, dispatch } = useAuth();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-[var(--surface)]">
      <div className="flex space-x-4">
        <Link to="/" className="text-[var(--text)] font-semibold text-lg">
          Home
        </Link>
        {user && (
          <Link to="/write" className="text-[var(--accent)]">
            ✍️ Write
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-[var(--text)]">Hi, {user.username}</span>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-[var(--accent)]">
              Login
            </Link>
            <Link to="/register" className="text-[var(--accent)]">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
