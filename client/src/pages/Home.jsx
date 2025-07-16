import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import usePagination from "../hooks/usePagination";
import Navbar from "../components/NavBar";

export default function Home() {
  const { page, searchTerm, goToPage, doSearch, limit } = usePagination(5);
  const [data, setData] = useState({ posts: [], total: 0, pages: 1 });

  useEffect(() => {
    API.get("/posts", { params: { search: searchTerm, page, limit } })
      .then((res) => setData(res.data))
      .catch(console.error);
  }, [searchTerm, page, limit]);

  return (
    <>
      <Navbar />
      <div className="p-4">
        <input
          className="w-full p-2 mb-4 bg-[var(--bg-alt)] text-[var(--text)] rounded border border-gray-700"
          type="text"
          placeholder="Search..."
          defaultValue={searchTerm}
          onKeyDown={(e) => e.key === "Enter" && doSearch(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.posts.map((post) => (
            <Link
              key={post._id}
              to={`/post/${post._id}`}
              className="bg-[var(--surface)] rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {post.photo && (
                <img
                  src={`http://localhost:5000/uploads/${post.photo}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-[var(--text)]">
                  {post.title}
                </h2>
                <p className="text-gray-400">
                  {post.desc.length > 100
                    ? post.desc.slice(0, 100) + "…"
                    : post.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: data.pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1
                  ? "bg-gray-600 text-[var(--text)]"
                  : "text-gray-400"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
