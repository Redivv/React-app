import React, { useContext, useEffect, Fragment, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CategoriesRequestService from "../services/CategoriesRequestService";
import AuthContext from "../store/auth-context";

const Main: React.FC = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    CategoriesRequestService.getAllCategories(authContext.tokenObject?.idToken!)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response));
  }, [authContext.tokenObject]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <button onClick={authContext.logout}>Logout</button>
      <button onClick={handleShow}>Modal</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Main;
