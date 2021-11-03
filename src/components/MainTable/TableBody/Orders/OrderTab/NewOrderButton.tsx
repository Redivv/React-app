import { Fragment, useState } from "react";
import classes from "./NewOrderButton.module.css";
import NewOrderModal from "./OrderModal/NewOrderModal";

const NewOrderButton = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <h2 className={classes.newOrderButton}>
        <button className="accordion-button" onClick={handleShow}>
          Add New Order
        </button>
      </h2>
      <NewOrderModal show={show} handleClose={handleClose} />
    </Fragment>
  );
};

export default NewOrderButton;
