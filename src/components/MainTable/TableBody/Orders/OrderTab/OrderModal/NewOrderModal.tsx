import { Modal, Button, Form, Accordion, Spinner } from "react-bootstrap";
import React, { FormEvent, useRef, useState, useContext } from "react";
import OrderModalBasic from "./Sections/OrderModalBasic";
import OrderModalNotes from "./Sections/OrderModalNotes";
import OrderModalShipping from "./Sections/OrderModalShipping";
import OrderContext from "../../../../../../store/order-context";
import OrderValidationService from "../../../../../../services/OrderValidationService";

const NewOrderModal: React.FC<{ show: boolean; handleClose: () => void }> = (
  props
) => {
  const titleInput = useRef<HTMLInputElement>(null);
  const clientInput = useRef<HTMLInputElement>(null);
  const addressInput = useRef<HTMLInputElement>(null);
  const deadlineInput = useRef<HTMLInputElement>(null);
  const notesInput = useRef<HTMLTextAreaElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const orderContext = useContext(OrderContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const orderObject = {
      title: titleInput.current?.value!,
      client: clientInput.current?.value!,
      address: addressInput.current?.value!,
      deadline: deadlineInput.current?.value!,
      notes: notesInput.current?.value!,
    };
    try {
      OrderValidationService.validateInsert(orderObject);
    } catch (e) {
      alert(e);
      return;
    }
    setIsProcessing(true);
    const shouldModalBeClosed = await orderContext.addNewOrder(orderObject);
    if (shouldModalBeClosed) {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsProcessing(false);
    props.handleClose();
  };

  return (
    <Modal show={props.show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>New Order</Modal.Title>
      </Modal.Header>
      <Form id="orderForm" onSubmit={handleSubmit}>
        <Modal.Body>
          {isProcessing ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Accordion defaultActiveKey="basic">
              <OrderModalBasic
                refs={{ title: titleInput, client: clientInput }}
              />
              <OrderModalShipping
                refs={{ address: addressInput, deadline: deadlineInput }}
              />
              <OrderModalNotes refs={{ notes: notesInput }} />
            </Accordion>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="reset" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewOrderModal;
