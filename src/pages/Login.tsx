import React, { useRef, useContext } from "react";
import TokenRequestService from "../services/TokenRequestService";
import AuthContext from "../store/auth-context";

const Login: React.FC = () => {
  const loginMailInput = useRef<HTMLInputElement>(null);
  const loginPasswordInput = useRef<HTMLInputElement>(null);
  const authContext = useContext(AuthContext);

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (loginMailInput.current?.value && loginPasswordInput.current?.value) {
      TokenRequestService
        .userLoginRequest(
          loginMailInput.current.value,
          loginPasswordInput.current.value
        )
        .then((response) => {
          authContext.login({
            idToken: response.data.idToken,
            refreshToken: response.data.refreshToken,
          });
        });
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
