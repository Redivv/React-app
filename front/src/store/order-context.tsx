import React, { createContext, useContext, useEffect, useState } from "react";
import OrderRequestService from "../services/OrderRequestService";
import Order from "../types/order";
import OrderContextData from "../types/orderContextData";
import AuthContext from "./auth-context";

const OrderContext = createContext<OrderContextData>({
  displayedOrders: [],
  areOrdersLoaded: false,
  isActionBeingProcessed: false,
  searchString: null,
  archiveActive: false,
  getAllCurrentOrders: () => {},
  searchOrders: () => {},
  getArchivedOrders: () => {},
  addNewOrder: () => {},
  editOrder: () => {},
  deleteOrderById: () => {},
  archiveOrderById: () => {},
  unArchiveOrderById: () => {},
  setOrdersAreBeingLoaded: () => {},
  setArchiveIsInactive: () => {},
});
export const OrderContextProvider: React.FC = (props) => {
  const [displayedOrders, setDisplayedOrders] = useState<Order[] | []>([]);
  const [areOrdersLoaded, setAreOrdersLoaded] = useState(false);
  const [isActionBeingProcessed, setIsActionBeingProcessed] = useState(false);
  const [searchString, setSearchString] = useState<string | null>(null);
  const [archiveActive, setArchiveActive] = useState(false);
  const authContext = useContext(AuthContext);

  const getAllCurrentOrders = () => {
    setSearchString(null);
    OrderRequestService.getAllCurrentOrders(authContext.accessToken!)
      .then((response) => {
        setDisplayedOrders([...response.data!]);
        setAreOrdersLoaded(true);
      })
      .catch(() => alert("An error occured. Please try again later"));
  };

  const searchOrders = (
    searchStringParam: string | null,
    persistSearch: boolean,
    overrideArchiveActive: boolean
  ) => {
    if (searchStringParam === "") {
      setAreOrdersLoaded(true);
      setSearchString(null);
      return;
    }
    if (persistSearch) {
      searchStringParam = searchString;
    } else {
      setSearchString(searchStringParam);
    }
    OrderRequestService.searchOrders(
      authContext.accessToken!,
      searchStringParam,
      overrideArchiveActive ? false : archiveActive
    )
      .then((response) => {
        setDisplayedOrders([...response.data!]);
        setAreOrdersLoaded(true);
      })
      .catch(() => alert("An error occured. Please try again later"));
  };

  const getArchivedOrders = () => {
    setArchiveActive(true);
    OrderRequestService.searchOrders(
      authContext.accessToken!,
      searchString,
      true
    )
      .then((response) => {
        setDisplayedOrders([...response.data!]);
        setAreOrdersLoaded(true);
      })
      .catch(() => alert("An error occured. Please try again later"));
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
      .catch(() => {
        setIsActionBeingProcessed(false);
        alert("Invalid data");
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
      .catch(() => {
        alert("Invalid data. Changes not saved");
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
      authContext.accessToken!,
      objectId
    ).catch(() => alert("Invalid data. Changes not saved"));
  };

  const archiveOrderById = (ordinalNumber: number, objectId: string) => {
    if (!window.confirm("Confirm archiving the order")) {
      return;
    }
    let displayedOrdersClone = displayedOrders;
    displayedOrdersClone.splice(ordinalNumber, 1);
    setDisplayedOrders([...displayedOrdersClone]);
    OrderRequestService.archiveOrderById(
      authContext.accessToken!,
      objectId
    ).catch(() => alert("Invalid data. Changes not saved"));
  };

  const unArchiveOrderById = (ordinalNumber: number, objectId: string) => {
    if (!window.confirm("Confirm restoring the order")) {
      return;
    }
    let displayedOrdersClone = displayedOrders;
    displayedOrdersClone.splice(ordinalNumber, 1);
    setDisplayedOrders([...displayedOrdersClone]);
    OrderRequestService.unArchiveOrderById(
      authContext.accessToken!,
      objectId
    ).catch(() => alert("Invalid data. Changes not saved"));
  };

  const setOrdersAreBeingLoaded = () => {
    setAreOrdersLoaded(false);
  };

  const setArchiveIsInactive = () => {
    setArchiveActive(false);
  };

  useEffect(() => {
    getAllCurrentOrders();
  }, []);

  const contextValues = {
    displayedOrders: displayedOrders,
    areOrdersLoaded: areOrdersLoaded,
    isActionBeingProcessed: isActionBeingProcessed,
    searchString: searchString,
    archiveActive: archiveActive,
    getAllCurrentOrders: getAllCurrentOrders,
    searchOrders: searchOrders,
    getArchivedOrders: getArchivedOrders,
    addNewOrder: addNewOrder,
    editOrder: editOrder,
    deleteOrderById: deleteOrderById,
    archiveOrderById: archiveOrderById,
    unArchiveOrderById: unArchiveOrderById,
    setOrdersAreBeingLoaded: setOrdersAreBeingLoaded,
    setArchiveIsInactive: setArchiveIsInactive,
  };

  return (
    <OrderContext.Provider value={contextValues}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
