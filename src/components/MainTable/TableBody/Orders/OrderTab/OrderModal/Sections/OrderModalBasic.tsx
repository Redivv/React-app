import { Accordion, Form } from "react-bootstrap";
import React, { RefObject } from "react";

const OrderModalBasic: React.FC<{
  refs: {
    client: RefObject<HTMLInputElement>;
  };
}> = (props) => {
  return (
    <Accordion.Item eventKey="basic">
      <Accordion.Header>Basic</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="titleInput">
          <Form.Label>Order Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Order Title"
            ref={props.refs.client}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="clientInput">
          <Form.Label>Client</Form.Label>
          <Form.Control type="text" placeholder="Client Name" />
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default OrderModalBasic;
