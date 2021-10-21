import AuthTokensObject from './authTokensObject';

type AuthData = {
  tokenObject: AuthTokensObject | null;
  isLoggedIn: boolean;
  login: (tokensObject: AuthTokensObject) => void;
  logout: () => void;
};

export default AuthData;
