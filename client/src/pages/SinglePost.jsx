import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API, { getImageUrl } from "../services/api";
import Navbar from "../components/NavBar";

export default function SinglePost() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const { id } = useParams();

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => setPost(res.data));
    API.get(`/comments/${id}`).then((res) => setComments(res.data));
  }, [id]);

  const submitComment = async () => {
    if (!text.trim()) return;
    await API.post("/comments", {
      postId: id,
      username: post.username,
      text,
    });
    setComments((prev) => [...prev, { username: post.username, text }]);
    setText("");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-6 bg-gray-900 text-white rounded-xl shadow-lg">
        {/* IMAGE */}
        {post.photo && (
          <img
            src={getImageUrl(post.photo)}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        {/* TITLE & BODY */}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-300 text-lg leading-relaxed">{post.desc}</p>

        {/* COMMENTS */}
        <div className="mt-10 border-t border-gray-700 pt-6">
          <h3 className="text-2xl font-semibold mb-4">Comments</h3>

          <div className="space-y-3 mb-6">
            {comments.map((c, i) => (
              <div
                key={i}
                className="bg-gray-800 px-4 py-3 rounded-md text-gray-100"
              >
                <span className="font-bold">{c.username}</span>: {c.text}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="text"
              className="flex-grow p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={submitComment}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
