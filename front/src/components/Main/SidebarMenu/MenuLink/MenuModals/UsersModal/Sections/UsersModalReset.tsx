import { Accordion, Button, Spinner } from "react-bootstrap";
import classes from "./UsersModalSection.module.css";
import { useState, useContext } from "react";
import UserRequestService from "../../../../../../../services/UserRequestService";
import AuthContext from "../../../../../../../store/auth-context";

const UsersModalReset = () => {
  const authContext = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const buttonClickHandle = () => {
    setIsProcessing(true);
    UserRequestService.requestPasswordResetRequestWhileLoggedIn(
      authContext.accessToken!
    ).then(() => {
      alert("An email with further instructions has been sent.");
      setIsProcessing(false);
    });
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
