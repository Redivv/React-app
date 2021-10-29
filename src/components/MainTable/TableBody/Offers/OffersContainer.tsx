import OfferTab from "./OfferTab/OfferTab";
import classes from "./OffersContainer.module.css"
import { Accordion } from "react-bootstrap";

const OffersContainer = () => {
  return (
    <Accordion className={classes.offersContainer}>
      <OfferTab />
    </Accordion>
  );
};

export default OffersContainer;
