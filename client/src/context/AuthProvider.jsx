import { useReducer } from "react";
import AuthContext from "./AuthContext";

// Load initial auth state from localStorage
const INITIAL = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return {
    user: user ? JSON.parse(user) : null,
    token: token || "",
  };
};

// Reducer to manage auth state
function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        user: null,
        token: "",
      };
    default:
      return state;
  }
}

// AuthProvider component wraps the app and provides auth context
export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {}, INITIAL);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
