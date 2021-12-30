import { RefObject, useState, useContext, Fragment } from "react";
import { Accordion, Form, Spinner } from "react-bootstrap";
import UserContext from "../../../../../../../../../store/user-context";
import User from "../../../../../../../../../types/user";

const TaskModalUser: React.FC<{
  refs: {
    user: RefObject<HTMLSelectElement>;
  };
  values: {
    userId: number | undefined | null;
  };
}> = (props) => {
  const userContext = useContext(UserContext);
  const [isProcessing, setIsProcessing] = useState(true);
  const [availableUsers, setAvailableUsers] = useState<User[] | [] | null>(
    null
  );

  const fetchAvailableUsers = async () => {
    if (userContext.taskAssignableUsers !== null) {
      setAvailableUsers(userContext.taskAssignableUsers);
    } else {
      setAvailableUsers(await userContext.fetchTaskAssignableUsers());
    }
    setIsProcessing(false);
  };

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
        <div className={isProcessing ? "d-none" : ""}>
          <Form.Group controlId="emailInput">
            <Form.Label>Users List</Form.Label>
            <Form.Select ref={props.refs.user}>
              <option value="">Select user from list</option>
              <option value="0">No user assigned</option>
              {availableUsers &&
                availableUsers.map((user, index) => (
                  <option
                    key={index}
                    value={user.id}
                    selected={props.values.userId == +user.id}
                  >
                    {user.email}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default TaskModalUser;
