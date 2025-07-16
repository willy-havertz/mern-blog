import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";
import Write from "./pages/Write";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/post/:id" element={<SinglePost />} />
      <Route path="/write" element={<Write />} />
    </Routes>
  );
}
