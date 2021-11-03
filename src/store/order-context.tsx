import React, { createContext, useContext, useEffect, useState } from "react";
import OrderRequestService from "../services/OrderRequestService";
import Order from "../types/order";
import OrderContextData from "../types/orderContextData";
import AuthContext from "./auth-context";

const OrderContext = createContext<OrderContextData>({
  displayedOrders: [],
  addNewOrder: () => {},
});

export const OrderContextProvider: React.FC = (props) => {
  const [displayedOrders, setDisplayedOrders] = useState<Order[] | []>([]);
  const authContext = useContext(AuthContext);

  const addNewOrder = (orderObject: Order) => {
    setDisplayedOrders([...displayedOrders, orderObject]);
  };

  const contextValues = {
    displayedOrders: displayedOrders,
    addNewOrder: addNewOrder,
  };

  return (
    <OrderContext.Provider value={contextValues}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
