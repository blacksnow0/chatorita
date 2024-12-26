import { createContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext();

export const AuthContextReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthContextReducer, {
    user: null,
  });

  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({
        type: "LOGIN",
        payload: user,
      });
    }
    setIsAuthReady(true);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};
