import OrderTab from "./OrderTab/OrderTab";
import classes from "./OrdersContainer.module.css";
import { Accordion, Spinner } from "react-bootstrap";
import NewOrderButton from "./OrderTab/NewOrderButton";
import { useEffect, useContext, useState, Fragment } from "react";
import Order from "../../../../../types/order";
import OrderContext from "../../../../../store/order-context";

const OrdersContainer = () => {
  const orderContext = useContext(OrderContext);
  const [displayedOrders, setDisplayedOrders] = useState<Order[] | []>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setDisplayedOrders(orderContext.displayedOrders);
    setIsLoaded(orderContext.areOrdersLoaded);
  }, [orderContext.displayedOrders, orderContext.areOrdersLoaded]);
  return (
    <Accordion className={classes.ordersContainer}>
      {isLoaded ? (
        <Fragment>
          {displayedOrders.map((order, index) => (
            <OrderTab order={order} ordinalNumber={index} key={order.id} />
          ))}
          {!orderContext.archiveActive && <NewOrderButton />}
        </Fragment>
      ) : (
        <Spinner
          animation="border"
          variant="primary"
          className="mx-auto mt-5 d-block"
        />
      )}
    </Accordion>
  );
};

export default OrdersContainer;
