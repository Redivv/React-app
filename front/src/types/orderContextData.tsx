import Order from "./order";

type OrderContextData = {
  displayedOrders: Order[] | [];
  areOrdersLoaded: boolean;
  isActionBeingProcessed: boolean;
  getAllCurrentOrders: () => void;
  searchOrders: (searchString: string) => void;
  addNewOrder: (orderObject: Order) => Promise<boolean> | void;
  editOrder: (
    orderObject: Order,
    ordinalNumber: number
  ) => Promise<boolean> | void;
  deleteOrderById: (ordinalNumber: number, objectId: string) => void;
  setOrdersAreBeingLoaded: () => void;
};

export default OrderContextData;
