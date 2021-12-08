type AuthContextData = {
  accessToken: string | null;
  isLoggedIn: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
};

export default AuthContextData;
