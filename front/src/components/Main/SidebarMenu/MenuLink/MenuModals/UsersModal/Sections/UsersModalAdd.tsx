import { Accordion, Form, Button, Spinner } from "react-bootstrap";
import { useRef, useState, useContext } from "react";
import classes from "./UsersModalSection.module.css";
import UserContext from "../../../../../../../store/user-context";

const UsersModalAdd = () => {
  const userContext = useContext(UserContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const newUserEmailInput = useRef<HTMLInputElement>(null);

  const formSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newUserEmailInput.current?.value === "") {
      alert("Input a new user's email");
      return;
    }
    setIsProcessing(true);
    await userContext.addUserByEmail(newUserEmailInput.current!.value!);
    setIsProcessing(false);
    newUserEmailInput.current!.value = "";
  };

  return (
    <Accordion.Item eventKey="add">
      <Accordion.Header>Add User</Accordion.Header>
      <Accordion.Body>
        <Spinner
          className={isProcessing ? "" : "d-none"}
          animation="border"
          variant="primary"
        />
        <Form
          onSubmit={formSubmitHandler}
          className={classes.sectionForm + " " + (isProcessing ? "d-none" : "")}
        >
          <Form.Group controlId="emailInput">
            <Form.Label>New User Email</Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="New User Email"
              ref={newUserEmailInput}
            />
          </Form.Group>
          <Button type="submit" className="btn">
            Send Invitation Link
          </Button>
        </Form>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default UsersModalAdd;
