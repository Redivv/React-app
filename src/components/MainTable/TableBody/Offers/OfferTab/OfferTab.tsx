import { Accordion } from "react-bootstrap";
import classes from "./OfferTab.module.css";

const OfferTab = () => {
  return (
    <Accordion.Item eventKey="0">
      <Accordion.Header className={classes.offerTab}>Penis</Accordion.Header>
      <Accordion.Body>
        <div className="d-flex">
          <div className={`col-3 ${classes.tableColumn}`}>dupa</div>
          <div className={`col-3 ${classes.tableColumn}`}>dupa</div>
          <div className={`col-3 ${classes.tableColumn}`}>dupa</div>
          <div className={`col-3 ${classes.tableColumn}`}>dupa</div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default OfferTab;
