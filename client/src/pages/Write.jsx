import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import useAuth from "../hooks/useAuth";

export default function Write() {
  const { user } = useAuth();
  const [form, setForm] = useState({ title: "", desc: "", categories: [] });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoFilename = null;
      if (file) {
        const data = new FormData();
        data.append("file", file);
        const uploadRes = await API.post("/upload", data);
        photoFilename = uploadRes.data.filename;
      }

      const payload = {
        ...form,
        photo: photoFilename,
        username: user.username,
      };

      const res = await API.post("/posts", payload);
      navigate(`/post/${res.data._id}`);
    } catch (err) {
      console.error("Write.handleSubmit error:", err);
      alert(err.response?.data?.error || err.message);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  return (
    <form
      className="max-w-xl mx-auto p-6 bg-[var(--surface)] rounded-lg space-y-4 shadow-lg border border-gray-700"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full p-3 bg-[var(--bg-alt)] text-[var(--text)] rounded-md border border-gray-700 focus:outline-none focus:ring focus:ring-[var(--accent)]"
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="w-full p-3 bg-[var(--bg-alt)] text-[var(--text)] rounded-md border border-gray-700 h-40 focus:outline-none focus:ring focus:ring-[var(--accent)]"
        placeholder="Tell your story…"
        onChange={(e) => setForm({ ...form, desc: e.target.value })}
      />

      {/* File input and preview */}
      <div className="space-y-2">
        <label
          htmlFor="file"
          className="cursor-pointer inline-block px-4 py-2 rounded-md bg-[var(--bg-alt)] text-[var(--text)] border border-gray-600 hover:bg-[var(--surface)] transition"
        >
          📷 Choose Image
        </label>
        <input
          type="file"
          id="file"
          name="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-64 object-cover rounded-md border border-gray-700"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-[var(--accent)] text-black rounded-md font-semibold hover:opacity-90 transition"
      >
        Publish
      </button>
    </form>
  );
}
