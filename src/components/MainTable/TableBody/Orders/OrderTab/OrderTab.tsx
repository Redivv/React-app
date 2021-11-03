import React, { useContext } from "react";
import { Accordion } from "react-bootstrap";
import OrderContext from "../../../../../store/order-context";
import Order from "../../../../../types/order";
import classes from "./OrderTab.module.css";

const OrderTab: React.FC<{
  order: Order;
  ordinalNumber: number;
}> = (props) => {
  const orderContext = useContext(OrderContext);

  const handleDeleteOrder = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    orderContext.deleteOrderById(props.ordinalNumber, props.order.id!);
  };

  return (
    <Accordion.Item eventKey={props.order.id!}>
      <Accordion.Header className={classes.orderTab}>
        <span>{props.order.client} </span>-<span> {props.order.deadline}</span>
        <span className={classes.deleteOrderButton} onClick={handleDeleteOrder}>
          <i className="fas fa-trash-alt"></i>
        </span>
        {/* TODO: deadline to human date / remaining */}
      </Accordion.Header>
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
