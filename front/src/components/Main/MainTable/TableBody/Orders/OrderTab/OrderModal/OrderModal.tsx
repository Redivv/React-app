import { Modal, Button, Form, Accordion, Spinner } from "react-bootstrap";
import React, { FormEvent, useRef, useState, useContext } from "react";
import OrderModalBasic from "./Sections/OrderModalBasic";
import OrderModalNotes from "./Sections/OrderModalNotes";
import OrderModalShipping from "./Sections/OrderModalShipping";
import OrderContext from "../../../../../../../store/order-context";
import OrderValidationService from "../../../../../../../services/OrderValidationService";
import Order from "../../../../../../../types/order";

const OrderModal: React.FC<{
  show: boolean;
  handleClose: () => void;
  order?: Order;
  ordinalNumber?: number;
}> = (props) => {
  const titleInput = useRef<HTMLInputElement>(null);
  const clientInput = useRef<HTMLInputElement>(null);
  const addressInput = useRef<HTMLInputElement>(null);
  const deadlineInput = useRef<HTMLInputElement>(null);
  const notesInput = useRef<HTMLTextAreaElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const orderContext = useContext(OrderContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const orderObject: Order = {
      title: titleInput.current?.value!,
      client: clientInput.current?.value!,
      shipping_address: addressInput.current?.value!,
      shipping_deadline: deadlineInput.current?.value!,
      notes: notesInput.current?.value!,
      archived_at: null,
    };
    try {
      OrderValidationService.validateInsert(orderObject);
    } catch (e) {
      alert(e);
      return;
    }
    setIsProcessing(true);
    let shouldModalBeClosed;
    if (props.order?.id) {
      orderObject["id"] = props.order.id!;
      shouldModalBeClosed = await orderContext.editOrder(
        orderObject,
        props.ordinalNumber!
      );
    } else {
      shouldModalBeClosed = await orderContext.addNewOrder(orderObject);
    }
    setIsProcessing(false);
    if (shouldModalBeClosed) {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    props.handleClose();
  };

  return (
    <Modal show={props.show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.order?.id ? "Edit Order" : "New Order"}
        </Modal.Title>
      </Modal.Header>
      <Form id="orderForm" onSubmit={handleSubmit}>
        <Modal.Body>
          <Spinner
            className={isProcessing ? "" : "d-none"}
            animation="border"
            variant="primary"
          />
          <Accordion
            defaultActiveKey="basic"
            className={isProcessing ? "d-none" : ""}
          >
            <OrderModalBasic
              refs={{ title: titleInput, client: clientInput }}
              values={{
                title: props.order?.title,
                client: props.order?.client,
              }}
            />
            <OrderModalShipping
              refs={{ address: addressInput, deadline: deadlineInput }}
              values={{
                address: props.order?.shipping_address,
                deadline: props.order?.shipping_deadline,
              }}
            />
            <OrderModalNotes
              refs={{ notes: notesInput }}
              values={{ notes: props.order?.notes }}
            />
          </Accordion>
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

export default OrderModal;
