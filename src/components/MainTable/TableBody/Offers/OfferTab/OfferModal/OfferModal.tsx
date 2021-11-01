import { Modal, Button, Form, Accordion } from "react-bootstrap";
import React, { FormEvent, useRef } from "react";
import OfferModalBasic from "./Sections/OfferModalBasic";
import OfferModalNotes from "./Sections/OfferModalNotes";
import OfferModalShipping from "./Sections/OfferModalShipping";

const OfferModal: React.FC<{ show: boolean; handleClose: () => void }> = (
  props
) => {
  const clientInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    alert(clientInput.current?.value);
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Order</Modal.Title>
      </Modal.Header>
      <Form id="offerForm" onSubmit={handleSubmit}>
        <Modal.Body>
          <Accordion defaultActiveKey="basic">
            <OfferModalBasic refs={{ client: clientInput }} />
            <OfferModalShipping />
            <OfferModalNotes />
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="reset" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default OfferModal;
