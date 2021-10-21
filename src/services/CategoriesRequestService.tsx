import axios from "axios";

class CategoriesRequestService {
  getAllCategories(idToken: string) {
    return axios.get(
      process.env
        .REACT_APP_FIREBASE_DB_API_ROUTE!.replace("<DB_ROUTE>", "/orders.json")
        .replace("<ID_TOKEN>", idToken)
    );
  }
}

export default new CategoriesRequestService();
