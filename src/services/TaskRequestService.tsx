import axios from "axios";
import Task from "../types/task";

class TaskRequestService {
  getAllTasksByOrderID(idToken: string, parentId: string) {
    return axios.get<Task[] | null>(
      process.env
        .REACT_APP_FIREBASE_DB_API_ROUTE!.replace(
          "<DB_ROUTE>",
          `/orders/${parentId}/tasks.json`
        )
        .replace("<ID_TOKEN>", idToken)
    );
  }

  addNewTask(idToken: string, parentId: string, taskObject: Task) {
    return axios.post<{ name: string }>(
      process.env
        .REACT_APP_FIREBASE_DB_API_ROUTE!.replace(
          "<DB_ROUTE>",
          `/orders/${parentId}/tasks.json`
        )
        .replace("<ID_TOKEN>", idToken),
      taskObject,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  editTask(idToken: string, parentId: string, taskObject: Task) {
    return axios.put(
      process.env
        .REACT_APP_FIREBASE_DB_API_ROUTE!.replace(
          "<DB_ROUTE>",
          `/orders/${parentId}/tasks/${taskObject.id!}.json`
        )
        .replace("<ID_TOKEN>", idToken),
      taskObject,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  deleteTaskById = (idToken: string, parentId: string, taskId: string) => {
    return axios.delete(
      process.env
        .REACT_APP_FIREBASE_DB_API_ROUTE!.replace(
          "<DB_ROUTE>",
          `/orders/${parentId}/tasks/${taskId}.json`
        )
        .replace("<ID_TOKEN>", idToken)
    );
  };
}

export default new TaskRequestService();
