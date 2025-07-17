import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API, { getImageUrl } from "../services/api";
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
      <div className="max-w-6xl mx-auto p-6">
        {/* Search bar */}
        <div className="mb-6">
          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Search blog posts..."
            defaultValue={searchTerm}
            onKeyDown={(e) => e.key === "Enter" && doSearch(e.target.value)}
          />
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.posts.map((post) => (
            <Link
              key={post._id}
              to={`/post/${post._id}`}
              className="bg-gray-900 hover:bg-gray-800 transition rounded-xl shadow-lg overflow-hidden"
            >
              {post.photo && (
                <img
                  src={getImageUrl(post.photo)}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {post.desc.length > 100
                    ? post.desc.slice(0, 100) + "…"
                    : post.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {data.pages > 1 && (
          <div className="flex justify-center mt-10">
            <div className="inline-flex gap-2">
              {Array.from({ length: data.pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`px-4 py-2 rounded-md border border-gray-600 transition font-semibold ${
                    page === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
