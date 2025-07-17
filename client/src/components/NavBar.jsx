import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, dispatch } = useAuth();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
  };

  return (
    <nav className="sticky top-0 z-50 bg-[var(--surface)] text-[var(--text)] shadow-md border-b border-gray-700 px-6 py-3 flex justify-between items-center">
      <Link
        to="/"
        className="text-xl font-bold hover:text-[var(--accent)] transition"
      >
        📰 Blogify
      </Link>

      <div className="flex items-center gap-6">
        {user && (
          <Link
            to="/write"
            className="hover:text-[var(--accent)] font-medium transition"
          >
            ✍️ Post
          </Link>
        )}

        {user ? (
          <>
            <span className="hidden sm:inline">
              Hi, <strong>{user.username}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-600 font-medium transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-[var(--accent)] transition font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-[var(--accent)] transition font-medium"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
