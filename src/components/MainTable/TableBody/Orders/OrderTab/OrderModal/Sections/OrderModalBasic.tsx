import { Accordion, Form } from "react-bootstrap";
import React, { RefObject } from "react";

const OrderModalBasic: React.FC<{
  refs: {
    title: RefObject<HTMLInputElement>;
    client: RefObject<HTMLInputElement>;
  };
  values: {
    title: string | undefined;
    client: string | undefined;
  }
}> = (props) => {
  return (
    <Accordion.Item eventKey="basic">
      <Accordion.Header>Basic</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="titleInput">
          <Form.Label className="fw-bold">Order Title*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Order Title"
            ref={props.refs.title}
            defaultValue={props.values?.title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="clientInput">
          <Form.Label className="fw-bold">Client*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Client Name"
            ref={props.refs.client}
            defaultValue={props.values?.client}
          />
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default OrderModalBasic;
