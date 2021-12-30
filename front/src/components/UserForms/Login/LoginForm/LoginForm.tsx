import React, { useRef, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import TokenRequestService from "../../../../services/TokenRequestService";
import AuthContext from "../../../../store/auth-context";
import classes from "../../UserForm.module.css";

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
      )
        .then((response) => {
          authContext.login(response.data.access_token, response.data.isAdmin);
        })
        .catch(() => alert("Invalid login data"));
    }
  };

  return (
    <Form onSubmit={formSubmitHandler} className={classes.userForm}>
      <Form.Group controlId="mailInput">
        <Form.Label>Mail</Form.Label>
        <Form.Control
          className="mb-3"
          type="text"
          placeholder="Email Address"
          ref={loginMailInput}
        />
      </Form.Group>
      <Form.Group controlId="passwordInput">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={loginPasswordInput}
        />
      </Form.Group>
      <Link className="d-block mb-3" to="/forgot">
        Forgot Password?
      </Link>
      <Button type="submit" className="btn">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
