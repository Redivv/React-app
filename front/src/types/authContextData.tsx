type AuthContextData = {
  accessToken: string | null;
  isAdmin: number | null;
  isLoggedIn: boolean;
  login: (accessToken: string, isAdmin: number) => void;
  logout: () => void;
};

export default AuthContextData;
