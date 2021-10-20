import axios from "axios";
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

  const loginHandler = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        //refreshToken
      }
    );
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    axios.interceptors.response.eject(0);
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
