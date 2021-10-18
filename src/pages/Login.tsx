import axios from "axios";
import React, { useRef } from "react";

const Login: React.FC = () => {
  const loginMailInput = useRef<HTMLInputElement>(null);
  const loginPasswordInput = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCURNYl2XhPS4SIeOoJRACUgUkIUkjpPwE",
        {
          email: loginMailInput.current?.value,
          password: loginPasswordInput.current?.value,
          returnSecureToken: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response.data.error));
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
