import React, { createContext, useContext, useEffect, useState } from "react";
import OrderRequestService from "../services/OrderRequestService";
import Order from "../types/order";
import OrderContextData from "../types/orderContextData";
import AuthContext from "./auth-context";

const OrderContext = createContext<OrderContextData>({
  displayedOrders: [],
  areOrdersLoaded: false,
  isActionBeingProcessed: false,
  getAllCurrentOrders: () => {},
  searchOrders: () => {},
  addNewOrder: () => {},
  editOrder: () => {},
  deleteOrderById: () => {},
  setOrdersAreBeingLoaded: () => {},
});
export const OrderContextProvider: React.FC = (props) => {
  const [displayedOrders, setDisplayedOrders] = useState<Order[] | []>([]);
  const [areOrdersLoaded, setAreOrdersLoaded] = useState(false);
  const [isActionBeingProcessed, setIsActionBeingProcessed] = useState(false);
  const authContext = useContext(AuthContext);

  const getAllCurrentOrders = () => {
    OrderRequestService.getAllCurrentOrders(authContext.accessToken!)
      .then((response) => {
        setDisplayedOrders([...response.data!]);
        setAreOrdersLoaded(true);
      })
      .catch((error) => {
        alert("kek");
      });
  };

  const searchOrders = (searchString: string) => {
    if (searchString === "") {
      setAreOrdersLoaded(true);
      return;
    }
    OrderRequestService.searchOrders(authContext.accessToken!, searchString)
      .then((response) => {
        console.log(response.data);
        setDisplayedOrders([...response.data!]);
        setAreOrdersLoaded(true);
      })
      .catch((error) => {
        alert("kek");
      });
  };

  const addNewOrder = async (orderObject: Order) => {
    setIsActionBeingProcessed(true);
    const response = await OrderRequestService.addNewOrder(
      authContext.accessToken!,
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
        setIsActionBeingProcessed(false);
        alert("KURWA");
        console.log(error.response.data);
        return false;
      });
    return response;
  };

  const editOrder = async (orderObject: Order, ordinalNumber: number) => {
    setIsActionBeingProcessed(true);
    const response = await OrderRequestService.editOrder(
      authContext.accessToken!,
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
        setIsActionBeingProcessed(false);
        console.log(error.response.data);
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
      authContext.accessToken!,
      objectId
    ).catch((error) => alert(error.response));
    // TODO: handle error - rollback delete
  };

  const setOrdersAreBeingLoaded = () => {
    setAreOrdersLoaded(false);
  };

  useEffect(() => {
    getAllCurrentOrders();
  }, []);

  const contextValues = {
    displayedOrders: displayedOrders,
    areOrdersLoaded: areOrdersLoaded,
    isActionBeingProcessed: isActionBeingProcessed,
    getAllCurrentOrders: getAllCurrentOrders,
    searchOrders: searchOrders,
    addNewOrder: addNewOrder,
    editOrder: editOrder,
    deleteOrderById: deleteOrderById,
    setOrdersAreBeingLoaded: setOrdersAreBeingLoaded,
  };

  return (
    <OrderContext.Provider value={contextValues}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
