import axios from "axios";

import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const { dispatch } = useAuthContext();
  const register = async (formData) => {
    try {
      console.log("this worked");
      const res = await axios.post(
        "https://chatorita.onrender.com/api/register",
        formData
      );
      if (res.status === 200) {
        const { username, token } = res.data;
        console.log(username, token);
        localStorage.setItem("user", JSON.stringify({ username, token }));
        dispatch({ type: "LOGIN", payload: { username, token } });
      }
    } catch (err) {
      console.error("Registeration failed", err.response?.data || err.message);
    }
  };
  return { register };
};
