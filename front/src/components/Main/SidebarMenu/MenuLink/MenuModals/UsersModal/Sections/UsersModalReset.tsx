import { Accordion, Button, Spinner } from "react-bootstrap";
import classes from "./UsersModalSection.module.css";
import { useState } from "react";

const UsersModalReset = () => {
  const [isProcessing, setisProcessing] = useState(false);
  const buttonClickHandle = () => {
    setisProcessing(true);
  };

  return (
    <Accordion.Item eventKey="reset">
      <Accordion.Header>Reset Password</Accordion.Header>
      <Accordion.Body>
        <Spinner
          className={isProcessing ? "" : "d-none"}
          animation="border"
          variant="primary"
        />
        <Button
          onClick={buttonClickHandle}
          className={
            classes.passwordResetButton + " " + (isProcessing ? "d-none" : "")
          }
        >
          Send Password Reset Link
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default UsersModalReset;
