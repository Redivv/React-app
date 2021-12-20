import { RefObject, useState } from "react";
import { Accordion, Form, Spinner } from "react-bootstrap";
import User from "../../../../../../../../../types/user";

const TaskModalUser: React.FC<{
  refs: {
    user: RefObject<HTMLSelectElement>;
  };
  values: {
    userId: number | undefined | null;
    userName: string | undefined | null;
  };
}> = (props) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [availableUsers, setAvailableUsers] = useState<User[] | [] | null>(
    null
  );

  const fetchAvailableUsers = () => {};

  return (
    <Accordion.Item eventKey="user">
      <Accordion.Header onClick={fetchAvailableUsers}>
        Assigned User
      </Accordion.Header>
      <Accordion.Body>
        <Spinner
          className={isProcessing ? "" : "d-none"}
          animation="border"
          variant="primary"
        />
        <Form className={isProcessing ? "d-none" : ""}>
          <Form.Group controlId="emailInput">
            <Form.Label>Users List</Form.Label>
            <Form.Select ref={props.refs.user}>
              <option value="">List of available users:</option>
              {availableUsers &&
                availableUsers.map((user, index) => (
                  <option key={index} value={user.id}>
                    {user.email}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default TaskModalUser;
