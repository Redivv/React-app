import { Accordion, Form, Button, Spinner } from "react-bootstrap";
import { useRef, useState, useContext } from "react";
import classes from "./UsersModalSection.module.css";
import User from "../../../../../../../types/user";
import UserContext from "../../../../../../../store/user-context";

const UsersModalDelete = () => {
  const userContext = useContext(UserContext);
  const [isProcessing, setIsProcessing] = useState(true);
  const [deleteIsEnabled, setDeleteIsEnabled] = useState(false);
  const [deletableUsers, setDeletableUsers] = useState<User[] | [] | null>(
    null
  );
  const selectedUserInput = useRef<HTMLSelectElement>(null);

  const formSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedUserInput.current?.value === "") {
      alert("Please select a valid user");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    setIsProcessing(true);
    await userContext.deleteUserById(selectedUserInput.current?.value!);
    setIsProcessing(false);
  };

  const userSelectHandler = () => {
    if (selectedUserInput.current?.value === "") {
      setDeleteIsEnabled(false);
      return;
    }
    setDeleteIsEnabled(true);
  };

  const getDeletableUsers = async () => {
    if (userContext.availableUsers !== null) {
      setDeletableUsers(userContext.availableUsers);
    } else {
      setDeletableUsers(await userContext.fetchAvailableUsers());
    }
    setIsProcessing(false);
  };

  return (
    <Accordion.Item eventKey="delete">
      <Accordion.Header onClick={getDeletableUsers}>
        Delete User
      </Accordion.Header>
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
              <option value="">List of deletable users:</option>
              {deletableUsers &&
                deletableUsers.map((user, index) => (
                  <option key={index} value={user.id}>
                    {user.email}
                  </option>
                ))}
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
