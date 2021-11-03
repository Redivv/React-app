import React from "react";
import { Accordion } from "react-bootstrap";
import Order from "../../../../../types/order";
import classes from "./OrderTab.module.css";

const OrderTab: React.FC<{ order: Order }> = (props) => {
  return (
    <Accordion.Item eventKey={props.order.id!}>
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
