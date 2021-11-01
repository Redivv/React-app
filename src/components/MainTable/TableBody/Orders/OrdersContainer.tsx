import OrderTab from "./OrderTab/OrderTab";
import classes from "./OrdersContainer.module.css"
import { Accordion } from "react-bootstrap";
import NewOrderButton from "./OrderTab/NewOrderButton";

const OrdersContainer = () => {
  return (
    <Accordion className={classes.ordersContainer}>
      <OrderTab />
      <NewOrderButton />
    </Accordion>
  );
};

export default OrdersContainer;
