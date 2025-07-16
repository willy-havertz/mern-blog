import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function useAuth() {
  const { state, dispatch } = useContext(AuthContext);
  return { user: state.user, token: state.token, dispatch };
}
