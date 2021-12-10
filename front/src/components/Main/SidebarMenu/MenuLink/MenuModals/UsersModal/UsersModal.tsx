import React from "react";
import { Modal, Accordion } from "react-bootstrap";
import UsersModalAdd from "./Sections/UsersModalAdd";
import UsersModalDelete from "./Sections/UsersModalDelete";
import UsersModalReset from "./Sections/UsersModalReset";

const UsersModal: React.FC<{ show: boolean; handleClose: () => void }> = (
  props
) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Accordion>
          <UsersModalAdd />
          <UsersModalDelete />
          <UsersModalReset />
        </Accordion>
      </Modal.Body>
    </Modal>
  );
};

export default UsersModal;
