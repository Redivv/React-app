import { Accordion, Form } from "react-bootstrap";
import React, { RefObject } from "react";

const OrderModalNotes: React.FC<{
  refs: {
    notes: RefObject<HTMLTextAreaElement>;
  };
  values: {
    notes: string | undefined;
  }
}> = (props) => {
  return (
    <Accordion.Item eventKey="notes">
      <Accordion.Header>Notes & Comments</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="notesInput">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Notes"
            style={{ height: "100px" }}
            ref={props.refs.notes}
            defaultValue={props.values?.notes}
          />
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default OrderModalNotes;
