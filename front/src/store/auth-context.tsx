import axios from "axios";
import React, { createContext, useState } from "react";
import TokenRequestService from "../services/TokenRequestService";
import AuthContextData from "../types/authContextData";

const AuthContext = createContext<AuthContextData>({
  accessToken: null,
  isAdmin: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const retriveStoredTokenData = (): string | null => {
  return localStorage.getItem("userToken");
};

const retriveStoredRoleData = (): number | null => {
  return localStorage.getItem("userIsAdmin")
    ? +localStorage.getItem("userIsAdmin")!
    : null;
};

export const AuthContextProvider: React.FC = (props) => {
  const [accessToken, setToken] = useState(retriveStoredTokenData());
  const [isAdmin, setIsAdmin] = useState(retriveStoredRoleData());

  if (accessToken) {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalConfig = error.config;
        if (error.response?.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          const response = await TokenRequestService.tokenRefreshRequest(
            accessToken
          );
          loginHandler(response.data.access_token, response.data.isAdmin);
          let errorUrl = new URL(originalConfig.url);
          errorUrl.searchParams.set("token", response.data.access_token);
          originalConfig["url"] = errorUrl.toString();
          return await axios.request(originalConfig);
        } else if (
          (error.response?.status === 401 && originalConfig._retry) ||
          originalConfig.url ===
            process.env.REACT_APP_REFRESH_TOKEN_ROUTE!.replace(
              "<ID_TOKEN>",
              accessToken
            )
        ) {
          logoutHandler();
        }
        return Promise.reject(error);
      }
    );
  }

  const loginHandler = (accessToken: string, isAdmin: number = 0) => {
    setToken(accessToken);
    setIsAdmin(isAdmin);
    localStorage.setItem("userToken", accessToken);
    localStorage.setItem("userIsAdmin", String(isAdmin));
  };

  const logoutHandler = () => {
    setToken(null);
    setIsAdmin(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userIsAdmin");
    axios.interceptors.response.eject(0);
  };

  const contextValues = {
    accessToken: accessToken,
    isAdmin: isAdmin,
    isLoggedIn: !!accessToken,
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
