import { Accordion, Form, Button, Spinner } from "react-bootstrap";
import { useRef, useState } from "react";
import classes from "./UsersModalSection.module.css";

const UsersModalAdd = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const newUserEmailInput = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
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
