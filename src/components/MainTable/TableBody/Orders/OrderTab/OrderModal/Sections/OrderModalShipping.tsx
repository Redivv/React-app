import { Accordion, Form } from "react-bootstrap";

const OrderModalShipping = () => {
  return (
    <Accordion.Item eventKey="shipping">
      <Accordion.Header>Shipping</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="shippingPlaceInput">
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control type="text" placeholder="Shipping Address" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="shippingDateInput">
          <Form.Label>Shipping Deadline</Form.Label>
          <Form.Control type="date" placeholder="Shipping Deadline" />
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default OrderModalShipping;
