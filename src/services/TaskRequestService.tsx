import axios from "axios";
import Task from "../types/task";

class TaskRequestService {
  addNewTask(idToken: string, parentId: string, taskObject: Task) {
    return axios.post<{ name: string }>(
      process.env
        .REACT_APP_FIREBASE_DB_API_ROUTE!.replace("<DB_ROUTE>", `/orders/${parentId}/tasks.json`)
        .replace("<ID_TOKEN>", idToken),
      taskObject,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export default new TaskRequestService();
