import { RefObject } from "react";
import { Accordion, Form } from "react-bootstrap";

const TaskModalValidation: React.FC<{
  refs: {
    terms: RefObject<HTMLTextAreaElement>;
    comments: RefObject<HTMLTextAreaElement>;
  };
  values: {
    terms: string | undefined;
    comments: string | undefined;
  };
}> = (props) => {
  return (
    <Accordion.Item eventKey="validation">
      <Accordion.Header>Validation*</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="termsInput">
          <Form.Label className="fw-bold">Validation Terms*</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Task Validation Terms"
            ref={props.refs.terms}
            defaultValue={props.values?.terms}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="commentsInput">
          <Form.Label>Validation Comments</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Task Validation Comments"
            ref={props.refs.comments}
            defaultValue={props.values?.comments}
          />
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default TaskModalValidation;
