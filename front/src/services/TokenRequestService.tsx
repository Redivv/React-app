import axios from "axios";

class TokenRequestService {
  userLoginRequest(emailValue: string, password: string) {
    return axios.post<{ access_token: string; isAdmin: number }>(
      process.env.REACT_APP_LOGIN_ROUTE!,
      {
        email: emailValue,
        password: password,
      }
    );
  }

  tokenRefreshRequest(idToken: string) {
    return axios.post<{ access_token: string; isAdmin: number }>(
      process.env.REACT_APP_REFRESH_TOKEN_ROUTE!.replace("<ID_TOKEN>", idToken)
    );
  }

  tokenLogoutRequest(idToken: string) {
    return axios.post(
      process.env.REACT_APP_LOGOUT_TOKEN_ROUTE!.replace("<ID_TOKEN>", idToken)
    );
  }
}

export default new TokenRequestService();
