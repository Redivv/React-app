import { Accordion, Form } from "react-bootstrap";
import React from "react";

const OrderModalArchivedBasic: React.FC<{
  values: {
    title: string | undefined;
    client: string | undefined;
  };
}> = (props) => {
  return (
    <Accordion.Item eventKey="basic">
      <Accordion.Header>Basic*</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="titleInput">
          <Form.Label className="fw-bold">Order Title*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Order Title"
            defaultValue={props.values?.title}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="clientInput">
          <Form.Label className="fw-bold">Client*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Client Name"
            defaultValue={props.values?.client}
            disabled
          />
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default OrderModalArchivedBasic;
