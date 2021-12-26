import { Accordion, Form } from "react-bootstrap";
import React from "react";

const OrderModalArchivedShipping: React.FC<{
  values: {
    address: string | undefined;
    deadline: string | undefined;
  };
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
            defaultValue={props.values?.address}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="shippingDateInput">
          <Form.Label className="fw-bold">Shipping Deadline*</Form.Label>
          <Form.Control
            type="date"
            placeholder="Shipping Deadline"
            defaultValue={props.values?.deadline}
            disabled
          />
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default OrderModalArchivedShipping;
