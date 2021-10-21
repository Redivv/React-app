import axios from "axios";
import querystring from "querystring";
import FirebaseLoginResponse from "../types/firebaseLoginResponse";
import FirebaseRefreshTokenResponse from "../types/firebaseRefreshTokenResponse";

class TokenRequestService {
  userLoginRequest(emailValue: string, password: string) {
    return axios.post<FirebaseLoginResponse>(
      process.env.REACT_APP_FIREBASE_LOGIN_ROUTE!,
      {
        email: emailValue,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  tokenRefreshRequest(refreshToken: string) {
    return axios.post<FirebaseRefreshTokenResponse>(
      process.env.REACT_APP_FIREBASE_REFRESH_TOKEN_ROUTE!,
      querystring.encode({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }
}

export default new TokenRequestService();
