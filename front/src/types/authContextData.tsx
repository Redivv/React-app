import AuthTokensObject from './authTokensObject';

type AuthContextData = {
  tokenObject: AuthTokensObject | null;
  isLoggedIn: boolean;
  login: (tokensObject: AuthTokensObject) => void;
  logout: () => void;
};

export default AuthContextData;
