import Order from "./order";

type OrderContextData = {
  displayedOrders: Order[] | [];
  addNewOrder: (orderObject: Order) => void;
};

export default OrderContextData;
