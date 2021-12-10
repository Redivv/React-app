import React, { Fragment, useRef, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "../UserForm.module.css";

const ForgotPasswordForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const forgotPasswordMailInput = useRef<HTMLInputElement>(null);

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
        <Form.Group controlId="mailInput">
          <Form.Label>Mail</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email Address"
            ref={forgotPasswordMailInput}
          />
        </Form.Group>
        <Link className="d-block mb-3" to="/login">
          Return To Login Form
        </Link>
        <Button type="submit" className="btn">
          Send Password Reset Link
        </Button>
      </Form>
    </Fragment>
  );
};

export default ForgotPasswordForm;
