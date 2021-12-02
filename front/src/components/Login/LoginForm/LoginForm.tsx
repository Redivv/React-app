import React, { useRef, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import TokenRequestService from "../../../services/TokenRequestService";
import AuthContext from "../../../store/auth-context";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const loginMailInput = useRef<HTMLInputElement>(null);
  const loginPasswordInput = useRef<HTMLInputElement>(null);
  const authContext = useContext(AuthContext);

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (loginMailInput.current?.value && loginPasswordInput.current?.value) {
      TokenRequestService.userLoginRequest(
        loginMailInput.current.value,
        loginPasswordInput.current.value
      ).then((response) => {
        authContext.login({
          idToken: response.data.idToken,
          refreshToken: response.data.refreshToken,
        });
      });
    }
  };

  return (
    <Form onSubmit={formSubmitHandler} className={classes.loginForm}>
      <Form.Group controlId="mailInput">
        <Form.Label>Mail</Form.Label>
        <Form.Control
          className="mb-3"
          type="text"
          placeholder="Email Address"
          ref={loginMailInput}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="passwordInput">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={loginPasswordInput}
        />
      </Form.Group>
      <Button type="submit" className="btn">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
