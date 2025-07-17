import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";
import Write from "./pages/Write";
import PrivateRoute from "./components/PrivateRoute"; 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/post/:id"
        element={
          <PrivateRoute>
            <SinglePost />
          </PrivateRoute>
        }
      />
      <Route
        path="/write"
        element={
          <PrivateRoute>
            <Write />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
