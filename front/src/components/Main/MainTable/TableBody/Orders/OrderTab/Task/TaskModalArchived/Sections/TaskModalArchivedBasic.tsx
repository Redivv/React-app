import { RefObject } from "react";
import { Accordion, Form } from "react-bootstrap";

const TaskModalArchivedBasic: React.FC<{
  values: {
    title: string | undefined;
    description: string | undefined;
  };
}> = (props) => {
  return (
    <Accordion.Item eventKey="basic">
      <Accordion.Header>Basic*</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="titleInput">
          <Form.Label className="fw-bold">Task Title*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Task title"
            defaultValue={props.values?.title}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="descriptionInput">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Task description"
            defaultValue={props.values?.description}
            disabled
          />
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default TaskModalArchivedBasic;
