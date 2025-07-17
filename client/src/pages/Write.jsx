import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import API from "../services/api";

export default function Write() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc) return;

    let photoFilename = null;

    if (file) {
      const data = new FormData();
      data.append("file", file);
      setUploading(true);
      try {
        const uploadRes = await API.post("/upload", data, {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        });
        photoFilename = uploadRes.data.filename;
      } catch (err) {
        console.error("Upload failed:", err);
      } finally {
        setUploading(false);
      }
    }

    try {
      const res = await API.post("/posts", {
        title,
        desc,
        photo: photoFilename,
        username: user.username,
      });

      if (res.status === 201) {
        navigate(`/post/${res.data._id}`);
      }
    } catch (err) {
      console.error("Post creation failed:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-[var(--text)] mb-6">
        Create a New Post
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-[var(--surface)] p-6 rounded-lg shadow"
      >
        {/* Image Upload */}
        <div className="space-y-2">
          <label
            htmlFor="file"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-alt)] text-[var(--accent)] border border-gray-700 rounded-md cursor-pointer hover:bg-[var(--surface)] transition"
          >
            📁 Choose Cover Image
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />

          {file && (
            <p className="text-sm text-[var(--text-light)] italic truncate">
              Selected: {file.name}
            </p>
          )}

          {uploading && (
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
              <div
                className="bg-[var(--accent)] h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-full h-64 object-cover rounded-lg border border-gray-700 shadow"
            />
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm text-[var(--text-light)] mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-700 bg-[var(--bg-alt)] text-[var(--text)]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title..."
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-[var(--text-light)] mb-1">
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 h-48 rounded-md border border-gray-700 bg-[var(--bg-alt)] text-[var(--text)] resize-none"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Write your content..."
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-[var(--accent)] text-white py-2 rounded-md font-medium hover:opacity-90 transition"
        >
          {uploading ? "Uploading..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
}
