import React, { useRef, useState, Fragment } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "../UserForm.module.css";

const ResetPasswordForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const resetPasswordPasswordInput = useRef<HTMLInputElement>(null);
  const resetPasswordConfirmPasswordInput = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
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
        <Link className="d-block mb-3" to="/login">
          Return To Login Form
        </Link>
        <Button type="submit" className="btn">
          Confirm Password Change
        </Button>
      </Form>
    </Fragment>
  );
};

export default ResetPasswordForm;
