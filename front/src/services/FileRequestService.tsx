import axios from "axios";
import Attachment from "../types/attachment";

class FileRequestService {
  sendNewFile(idToken: string, formData: FormData) {
    return axios.post<Attachment[]>(
      process.env
        .REACT_APP_DB_API_ROUTE!.replace("<DB_ROUTE>", "/files")
        .replace("<ID_TOKEN>", idToken),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
}

export default new FileRequestService();
