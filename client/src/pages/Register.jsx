import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const [form, setForm] = useState({});
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/register", form);
    dispatch({
      type: "LOGIN",
      payload: { user: res.data, token: res.data.token },
    });
    localStorage.setItem("token", JSON.stringify(res.data.token));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>
  );
}
