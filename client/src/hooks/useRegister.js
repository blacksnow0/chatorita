import axios from "axios";

import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const { dispatch } = useAuthContext();
  const register = async (formData) => {
    try {
      const res = await axios.post(
        "https://chatorita.onrender.com/api/register",
        formData
      );
      if (res.status === 200) {
        const { username, token } = res.data;
        localStorage.setItem("user", JSON.stringify({ username, token }));
        dispatch({ type: "LOGIN", payload: { username, token } });
      }
    } catch (err) {
      console.error("Registeration failed", err.response?.data || err.message);
      throw err.response?.data?.message || "Login failed. Please try again.";
    }
  };
  return { register };
};
