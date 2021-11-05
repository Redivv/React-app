import axios from "axios";
import React, { createContext, useState } from "react";
import TokenRequestService from "../services/TokenRequestService";
import AuthContextData from "../types/authContextData";
import AuthTokensObject from "../types/authTokensObject";

const AuthContext = createContext<AuthContextData>({
  tokenObject: { idToken: null, refreshToken: null },
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const retriveStoredTokenData = (): AuthTokensObject => {
  return {
    idToken: localStorage.getItem("userToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
};

export const AuthContextProvider: React.FC = (props) => {
  const tokenData = retriveStoredTokenData();
  const [tokenObject, setToken] = useState(tokenData);

  if (tokenObject.idToken) {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalConfig = error.config;
        if (error.response?.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          if (!tokenObject.refreshToken) {
            logoutHandler();
            return Promise.reject(error);
          }
          const response = await TokenRequestService.tokenRefreshRequest(
            tokenObject.refreshToken
          );
          loginHandler({
            idToken: response.data.id_token,
            refreshToken: response.data.refresh_token,
          });
          let errorUrl = new URL(originalConfig.url);
          errorUrl.searchParams.set("auth", response.data.id_token);
          originalConfig["url"] = errorUrl.toString();
          return await axios.request(originalConfig);
        }
        return Promise.reject(error);
      }
    );
  }

  const loginHandler = (tokensObject: AuthTokensObject) => {
    setToken(tokensObject);
    localStorage.setItem("userToken", tokensObject.idToken!);
    localStorage.setItem("refreshToken", tokensObject.refreshToken!);
  };

  const logoutHandler = () => {
    setToken({
      idToken: null,
      refreshToken: null,
    });
    localStorage.removeItem("userToken");
    localStorage.removeItem("refreshToken");
    axios.interceptors.response.eject(0);
  };

  const contextValues = {
    tokenObject: tokenObject,
    isLoggedIn: !!tokenObject.idToken,
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
