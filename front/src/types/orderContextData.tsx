import Order from "./order";

type OrderContextData = {
  displayedOrders: Order[] | [];
  areOrdersLoaded: boolean;
  isActionBeingProcessed: boolean;
  searchString: string | null;
  archiveActive: boolean;
  getAllCurrentOrders: () => void;
  searchOrders: (searchString: string | null, persistSearch: boolean, overrideArchiveActive: boolean) => void;
  getArchivedOrders: () => void;
  addNewOrder: (orderObject: Order) => Promise<boolean> | void;
  editOrder: (
    orderObject: Order,
    ordinalNumber: number
  ) => Promise<boolean> | void;
  deleteOrderById: (ordinalNumber: number, objectId: string) => void;
  archiveOrderById: (ordinalNumber: number, objectId: string) => void;
  unArchiveOrderById: (ordinalNumber: number, objectId: string) => void;
  setOrdersAreBeingLoaded: () => void;
  setArchiveIsInactive: () => void;
};

export default OrderContextData;
