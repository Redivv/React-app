import { Accordion, Form } from "react-bootstrap";
import React, { RefObject } from "react";

const OrderModalShipping: React.FC<{
  refs: {
    address: RefObject<HTMLInputElement>;
    deadline: RefObject<HTMLInputElement>;
  };
  values: {
    address: string | undefined;
    deadline: string | undefined;
  }
}> = (props) => {
  return (
    <Accordion.Item eventKey="shipping">
      <Accordion.Header>Shipping*</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="shippingPlaceInput">
          <Form.Label className="fw-bold">Shipping Address*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Shipping Address"
            ref={props.refs.address}
            defaultValue={props.values?.address}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="shippingDateInput">
          <Form.Label className="fw-bold">Shipping Deadline*</Form.Label>
          <Form.Control
            type="date"
            placeholder="Shipping Deadline"
            ref={props.refs.deadline}
            defaultValue={props.values?.deadline}
          />
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default OrderModalShipping;
