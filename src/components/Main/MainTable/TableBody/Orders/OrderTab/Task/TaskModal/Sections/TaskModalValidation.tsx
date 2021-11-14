import { RefObject } from "react";
import { Accordion, Form } from "react-bootstrap";

const TaskModalValidation: React.FC<{
  refs: {
    terms: RefObject<HTMLTextAreaElement>;
  };
  values: {
    terms: string | undefined;
  };
}> = (props) => {
  return (
    <Accordion.Item eventKey="validation">
      <Accordion.Header>Validation</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="descriptionInput">
          <Form.Label className="fw-bold">Validation Terms*</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Task Validation Terms"
            ref={props.refs.terms}
            defaultValue={props.values?.terms}
          />
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default TaskModalValidation;
