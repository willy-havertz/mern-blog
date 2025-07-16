import { createContext } from "react";

// Only exports the context object
const AuthContext = createContext({
  user: null,
  token: "",
});

export default AuthContext;
