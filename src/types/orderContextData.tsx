import Order from "./order";

type OrderContextData = {
  displayedOrders: Order[] | [];
  areOrdersLoaded: boolean;
  isActionBeingProcessed: boolean;
  addNewOrder: (orderObject: Order) => Promise<boolean> | void;
  deleteOrderById: (ordinalNumber: number, objectId: string) => void;
};

export default OrderContextData;