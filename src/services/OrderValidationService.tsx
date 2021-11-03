import Order from "../types/order";

class OrderValidationService {
  validateInsert(orderObject: Order) {
    if (
      !orderObject.title ||
      !orderObject.client ||
      !orderObject.address ||
      !orderObject.deadline
    ) {
      throw new Error("Fill all required fields");
    }
  }
}

export default new OrderValidationService();
