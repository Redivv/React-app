import React, { createContext, useContext, useEffect, useState } from "react";
import OrderRequestService from "../services/OrderRequestService";
import Order from "../types/order";
import OrderContextData from "../types/orderContextData";
import AuthContext from "./auth-context";

const OrderContext = createContext<OrderContextData>({
  displayedOrders: [],
  areOrdersLoaded: false,
  isActionBeingProcessed: false,
  addNewOrder: () => {},
  editOrder: () => {},
  deleteOrderById: () => {},
});
export const OrderContextProvider: React.FC = (props) => {
  const [displayedOrders, setDisplayedOrders] = useState<Order[] | []>([]);
  const [areOrdersLoaded, setAreOrdersLoaded] = useState(false);
  const [isActionBeingProcessed, setIsActionBeingProcessed] = useState(false);
  const authContext = useContext(AuthContext);

  const addNewOrder = async (orderObject: Order) => {
    setIsActionBeingProcessed(true);
    const response = await OrderRequestService.addNewOrder(
      authContext.tokenObject?.idToken!,
      orderObject
    )
      .then((response) => {
        orderObject["id"] = response.data.name;
        alert("Order Saved");
        setIsActionBeingProcessed(false);
        setDisplayedOrders([...displayedOrders, orderObject]);
        return true;
      })
      .catch((error) => {
        alert("KURWA");
        console.log(error.response);
        setIsActionBeingProcessed(false);
        return false;
      });
    return response;
  };

  const editOrder = async (orderObject: Order, ordinalNumber: number) => {
    setIsActionBeingProcessed(true);
    const response = await OrderRequestService.editOrder(
      authContext.tokenObject?.idToken!,
      orderObject
    )
      .then(() => {
        alert("Order Changed");
        setIsActionBeingProcessed(false);
        let displayedOrdersClone = displayedOrders;
        displayedOrders[ordinalNumber] = orderObject;
        setDisplayedOrders([...displayedOrdersClone]);
        return true;
      })
      .catch((error) => {
        alert("KURWA");
        console.log(error.response);
        setIsActionBeingProcessed(false);
        return false;
      });
    return response;
  };

  const deleteOrderById = (ordinalNumber: number, objectId: string) => {
    if (!window.confirm("Confirm deleting the order")) {
      return;
    }
    let displayedOrdersClone = displayedOrders;
    displayedOrdersClone.splice(ordinalNumber, 1);
    setDisplayedOrders([...displayedOrdersClone]);
    OrderRequestService.deleteOrderById(
      authContext.tokenObject?.idToken!,
      objectId
    ).catch((error) => alert(error.response));
    // TODO: handle error - rollback delete
  };

  useEffect(() => {
    OrderRequestService.getAllCurrentOrders(authContext.tokenObject?.idToken!)
      .then((response) => {
        let newDisplayedOrders = [];
        for (const orderId in response.data!) {
          newDisplayedOrders.push({ id: orderId, ...response.data[orderId] });
        }
        setDisplayedOrders([...newDisplayedOrders]);
        setAreOrdersLoaded(true);
      })
      .catch((error) => {
        alert("kek");
      });
  }, []);

  const contextValues = {
    displayedOrders: displayedOrders,
    areOrdersLoaded: areOrdersLoaded,
    isActionBeingProcessed: isActionBeingProcessed,
    addNewOrder: addNewOrder,
    editOrder: editOrder,
    deleteOrderById: deleteOrderById,
  };

  return (
    <OrderContext.Provider value={contextValues}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
