import { Accordion, Form } from "react-bootstrap";

const OfferModalNotes = () => {
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
          />
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default OfferModalNotes;
