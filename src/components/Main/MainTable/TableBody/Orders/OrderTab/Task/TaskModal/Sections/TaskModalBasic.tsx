import { RefObject } from "react";
import { Accordion, Form } from "react-bootstrap";

const TaskModalBasic: React.FC<{
  refs: {
    title: RefObject<HTMLInputElement>;
    description: RefObject<HTMLTextAreaElement>;
  };
  values: {
    title: string | undefined;
    description: string | undefined;
  };
}> = (props) => {
  return (
    <Accordion.Item eventKey="basic">
      <Accordion.Header>Basic</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="titleInput">
          <Form.Label className="fw-bold">Task Title*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Task title"
            ref={props.refs.title}
            defaultValue={props.values?.title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="descriptionInput">
          <Form.Label className="fw-bold">Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Task description"
            ref={props.refs.description}
            defaultValue={props.values?.description}
          />
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default TaskModalBasic;
