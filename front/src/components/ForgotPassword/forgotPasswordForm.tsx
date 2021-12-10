import React, { Fragment, useRef, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import classes from "./ForgotPasswordForm.module.css";

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
        className={
          classes.forgotPasswordForm + " " + (isProcessing ? "d-none" : "")
        }
      >
        <Form.Group controlId="mailInput">
          <Form.Label>Mail</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Email Address"
            ref={forgotPasswordMailInput}
          />
        </Form.Group>
        <Button type="submit" className="btn">
          Send Password Reset Link
        </Button>
      </Form>
    </Fragment>
  );
};

export default ForgotPasswordForm;
