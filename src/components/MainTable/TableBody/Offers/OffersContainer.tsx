import OfferTab from "./OfferTab/OfferTab";
import classes from "./OffersContainer.module.css"
import { Accordion } from "react-bootstrap";
import NewOfferButton from "./OfferTab/NewOfferButton";

const OffersContainer = () => {
  return (
    <Accordion className={classes.offersContainer}>
      <OfferTab />
      <NewOfferButton />
    </Accordion>
  );
};

export default OffersContainer;
