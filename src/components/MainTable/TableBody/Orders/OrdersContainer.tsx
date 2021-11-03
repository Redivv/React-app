import OrderTab from "./OrderTab/OrderTab";
import classes from "./OrdersContainer.module.css";
import { Accordion } from "react-bootstrap";
import NewOrderButton from "./OrderTab/NewOrderButton";
import { useEffect, useContext, useState, Fragment } from "react";
import OrderRequestService from "../../../../services/OrderRequestService";
import AuthContext from "../../../../store/auth-context";
import Order from "../../../../types/order";

const OrdersContainer = () => {
  const authContext = useContext(AuthContext);
  const [displayedOrders, setDisplayedOrders] = useState<Order[] | []>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    OrderRequestService.getAllCurrentOrders(authContext.tokenObject?.idToken!)
      .then((response) => {
        let newDisplayedOrders = [];
        for (const orderId in response.data!) {
          newDisplayedOrders.push({ id: orderId, ...response.data[orderId] });
        }
        setDisplayedOrders(newDisplayedOrders);
        setIsLoaded(true);
      })
      .catch((error) => console.log(error.response));
  }, [authContext.tokenObject?.idToken]);
  return (
    <Accordion className={classes.ordersContainer}>
      {isLoaded && (
        <Fragment>
          {displayedOrders.map((order) => (
            <OrderTab order={order} key={order.id} />
          ))}
          <NewOrderButton />
        </Fragment>
      )}
    </Accordion>
  );
};

export default OrdersContainer;
