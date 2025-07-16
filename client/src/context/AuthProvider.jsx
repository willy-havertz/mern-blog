import { useReducer } from "react";
import AuthContext from "./AuthContext";

const INITIAL = { user: null, token: "" };

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return INITIAL;
    default:
      return state;
  }
}

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
