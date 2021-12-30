import React, { Fragment, useContext } from "react";
import { Modal, Accordion } from "react-bootstrap";
import AuthContext from "../../../../../../store/auth-context";
import UsersModalAdd from "./Sections/UsersModalAdd";
import UsersModalDelete from "./Sections/UsersModalDelete";
import UsersModalReset from "./Sections/UsersModalReset";

const UsersModal: React.FC<{ show: boolean; handleClose: () => void }> = (
  props
) => {
  const authContext = useContext(AuthContext);
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Accordion>
          {authContext.isAdmin === 1 && (
            <Fragment>
              <UsersModalAdd />
              <UsersModalDelete />
            </Fragment>
          )}
          <UsersModalReset />
        </Accordion>
      </Modal.Body>
    </Modal>
  );
};

export default UsersModal;
