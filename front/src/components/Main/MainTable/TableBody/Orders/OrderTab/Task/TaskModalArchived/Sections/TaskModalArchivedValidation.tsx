import { Accordion, Form } from "react-bootstrap";

const TaskModalArchivedValidation: React.FC<{
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
            disabled
            placeholder="Task Validation Terms"
            defaultValue={props.values?.terms}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="commentsInput">
          <Form.Label>Validation Comments</Form.Label>
          <Form.Control
            as="textarea"
            disabled
            placeholder="Task Validation Comments"
            defaultValue={props.values?.comments}
          />
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default TaskModalArchivedValidation;
