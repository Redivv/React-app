import Task from "../types/task";

class TaskValidationService {
  validateInsert(taskObject: Task) {
    if (!taskObject.title || !taskObject.terms) {
      throw new Error("Fill all required fields");
    }
  }
}

export default new TaskValidationService();
