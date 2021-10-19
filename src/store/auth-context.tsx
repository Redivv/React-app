import React, { createContext, useState } from "react";
import AuthData from "../types/authData";

const AuthContext = createContext<AuthData>({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const retriveStoredToken = () => {
  return localStorage.getItem("token");
};

export const AuthContextProvider: React.FC = (props) => {
  const tokenData = retriveStoredToken();
  const [token, setToken] = useState(tokenData);

  console.log(token);

  const loginHandler = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const contextValues = {
    token: token,
    isLoggedIn: !!token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
