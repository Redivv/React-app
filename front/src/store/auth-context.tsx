import axios from "axios";
import React, { createContext, useState } from "react";
import TokenRequestService from "../services/TokenRequestService";
import AuthContextData from "../types/authContextData";

const AuthContext = createContext<AuthContextData>({
  accessToken: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const retriveStoredTokenData = (): string | null => {
  return localStorage.getItem("userToken");
};

export const AuthContextProvider: React.FC = (props) => {
  const [accessToken, setToken] = useState(retriveStoredTokenData());

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
          loginHandler(response.data.access_token);
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

  const loginHandler = (accessToken: string) => {
    setToken(accessToken);
    localStorage.setItem("userToken", accessToken);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("userToken");
    axios.interceptors.response.eject(0);
  };

  const contextValues = {
    accessToken: accessToken,
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
