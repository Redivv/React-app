import { Modal, Button, Form, Accordion } from "react-bootstrap";
import React from "react";
import Order from "../../../../../../../types/order";
import OrderModalArchivedBasic from "./Sections/OrderModalArchivedBasic";
import OrderModalArchivedShipping from "./Sections/OrderModalArchivedShipping";
import OrderModalArchivedNotes from "./Sections/OrderModalArchivedNotes";

const OrderModalArchived: React.FC<{
  show: boolean;
  handleClose: () => void;
  order?: Order;
}> = (props) => {
  const handleCloseModal = () => {
    props.handleClose();
  };

  return (
    <Modal show={props.show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Archived Order</Modal.Title>
      </Modal.Header>
      <Form id="orderForm">
        <Modal.Body>
          <Accordion defaultActiveKey="basic">
            <OrderModalArchivedBasic
              values={{
                title: props.order?.title,
                client: props.order?.client,
              }}
            />
            <OrderModalArchivedShipping
              values={{
                address: props.order?.shipping_address,
                deadline: props.order?.shipping_deadline,
              }}
            />
            <OrderModalArchivedNotes
              values={{ notes: props.order?.notes, files: props.order?.files! }}
            />
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="reset" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default OrderModalArchived;
