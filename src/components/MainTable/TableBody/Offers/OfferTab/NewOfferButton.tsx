import { Fragment, useState } from "react";
import classes from "./NewOfferButton.module.css";
import OfferModal from "./OfferModal";

const NewOfferButton = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <h2 className={classes.newOfferButton}>
        <button className="accordion-button" onClick={handleShow}>
          Add New Offer
        </button>
      </h2>
      <OfferModal show={show} handleClose={handleClose} />
    </Fragment>
  );
};

export default NewOfferButton;
