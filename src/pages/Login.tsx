import axios from "axios";
import React, { useRef, useContext } from "react";
import AuthContext from "../store/auth-context";
import FirebaseLoginResponse from "../types/firebaseLoginResponse";

const Login: React.FC = () => {
  const loginMailInput = useRef<HTMLInputElement>(null);
  const loginPasswordInput = useRef<HTMLInputElement>(null);
  const authContext = useContext(AuthContext);

  const formSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post<FirebaseLoginResponse>(
        process.env.REACT_APP_FIREBASE_LOGIN_ROUTE!,
        {
          email: loginMailInput.current?.value,
          password: loginPasswordInput.current?.value,
          returnSecureToken: true,
        }
      );
      authContext.login(response.data.idToken);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <label htmlFor="mail">Mail</label>
      <input type="text" name="mail" id="mail" ref={loginMailInput} />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        name="password"
        id="password"
        ref={loginPasswordInput}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
