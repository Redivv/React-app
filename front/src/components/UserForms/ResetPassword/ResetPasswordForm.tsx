import React, { useRef, useState, Fragment, useContext } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import classes from "../UserForm.module.css";
import useQuery from "../../../hooks/useQuery";
import UserRequestService from "../../../services/UserRequestService";
import AuthContext from "../../../store/auth-context";
import TokenRequestService from "../../../services/TokenRequestService";

const ResetPasswordForm = () => {
  const authContext = useContext(AuthContext);
  const params = useQuery();
  const history = useHistory();
  const [isProcessing, setIsProcessing] = useState(false);
  const resetPasswordPasswordInput = useRef<HTMLInputElement>(null);
  const resetPasswordConfirmPasswordInput = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      resetPasswordPasswordInput.current?.value === "" ||
      resetPasswordConfirmPasswordInput.current?.value === ""
    ) {
      alert("Fill in the form fields");
      return;
    }
    if (
      resetPasswordPasswordInput.current?.value !==
      resetPasswordConfirmPasswordInput.current?.value
    ) {
      alert("Both password and it's confirmation must match");
      return;
    }
    setIsProcessing(true);
    UserRequestService.passwordResetRequest(
      params.get("token")!,
      params.get("email")!,
      resetPasswordPasswordInput.current?.value!,
      resetPasswordConfirmPasswordInput.current?.value!
    )
      .then(() => {
        alert("Password sucessfully reset");
        setIsProcessing(false);
        if (authContext.accessToken) {
          TokenRequestService.tokenLogoutRequest(authContext.accessToken!);
          authContext.logout();
          history.push("/login");
        }
      })
      .catch(() => {
        alert(
          "Invalid data, passwords must match and be at least 8 characters long"
        );
        setIsProcessing(false);
      });
  };

  return (
    <Fragment>
      <Spinner
        className={
          classes.processingSpinner + " " + (isProcessing ? "" : "d-none")
        }
        animation="border"
        variant="primary"
      />
      <Form
        onSubmit={formSubmitHandler}
        className={classes.userForm + " " + (isProcessing ? "d-none" : "")}
      >
        <Form.Group controlId="passwordInput">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            className="mb-3"
            type="password"
            placeholder="New Password"
            ref={resetPasswordPasswordInput}
          />
        </Form.Group>
        <Form.Group controlId="confirmPasswordInput">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            ref={resetPasswordConfirmPasswordInput}
          />
        </Form.Group>
        {authContext.accessToken ? (
          <Link className="d-block mb-3" to="/main">
            Return To Main Page
          </Link>
        ) : (
          <Link className="d-block mb-3" to="/login">
            Return To Login Form
          </Link>
        )}
        <Button type="submit" className="btn">
          Confirm Password Change
        </Button>
      </Form>
    </Fragment>
  );
};

export default ResetPasswordForm;
