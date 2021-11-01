import { Accordion } from "react-bootstrap";
import classes from "./OrderTab.module.css";

const OrderTab = () => {
  return (
    <Accordion.Item eventKey="0">
      <Accordion.Header className={classes.orderTab}>Penis</Accordion.Header>
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

export default OrderTab;
