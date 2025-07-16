import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
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
    await API.post("/comments", {
      postId: id,
      username: post.username,
      text,
    });
    setComments([...comments, { username: post.username, text }]);
    setText("");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 bg-[var(--surface)] rounded-lg">
        {post.photo && (
          <img
            src={`http://localhost:5000/uploads/${post.photo}`}
            alt={post.title}
            className="w-full h-80 object-cover rounded-t-lg"
          />
        )}
        <div className="p-4">
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2">
            {post.title}
          </h1>
          <p className="text-[var(--text)]">{post.desc}</p>
        </div>

        <section className="mt-6 p-4 border-t border-gray-700">
          <h3 className="text-xl text-[var(--text)] mb-2">Comments</h3>
          {comments.map((c, i) => (
            <div key={i} className="mb-2 text-[var(--text)]">
              <b className="mr-1">{c.username}:</b> {c.text}
            </div>
          ))}

          <div className="flex space-x-2 mt-4">
            <input
              className="flex-grow p-2 bg-[var(--bg-alt)] text-[var(--text)] rounded border border-gray-700"
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-[var(--accent)] text-black rounded font-semibold"
              onClick={submitComment}
            >
              Submit
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
