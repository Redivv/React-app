import { Accordion, Form, Button, Spinner } from "react-bootstrap";
import { useRef, useState } from "react";
import classes from "./UsersModalSection.module.css";

const UsersModalDelete = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [deleteIsEnabled, setDeleteIsEnabled] = useState(false);
  const selectedUserInput = useRef<HTMLSelectElement>(null);

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
  };

  const userSelectHandler = () => {
    if (selectedUserInput.current?.value === "") {
      setDeleteIsEnabled(false);
      return;
    }
    setDeleteIsEnabled(true);
  };

  return (
    <Accordion.Item eventKey="delete">
      <Accordion.Header>Delete User</Accordion.Header>
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
            <Form.Label>Users List</Form.Label>
            <Form.Select ref={selectedUserInput} onChange={userSelectHandler}>
              <option value="">Choose a user from the list</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
          <Button
            type="submit"
            disabled={!deleteIsEnabled}
            className="btn mt-3"
          >
            Delete Selected User
          </Button>
        </Form>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default UsersModalDelete;
