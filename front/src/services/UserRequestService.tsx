import axios from "axios";
import User from "../types/user";

class UserRequestService {
  getAllDeletableUsersRequest(idToken: string) {
    return axios.get<User[] | []>(
      process.env
        .REACT_APP_DB_API_ROUTE!.replace("<DB_ROUTE>", "/users/deletable")
        .replace("<ID_TOKEN>", idToken)
    );
  }
  getAllTaskAssignableUsersRequest(idToken: string) {
    return axios.get<User[] | []>(
      process.env
        .REACT_APP_DB_API_ROUTE!.replace("<DB_ROUTE>", "/users/assignable")
        .replace("<ID_TOKEN>", idToken)
    );
  }

  addNewUserAccountRequest(idToken: string, emailValue: string) {
    return axios.post<User>(
      process.env
        .REACT_APP_DB_API_ROUTE!.replace("<DB_ROUTE>", "/users")
        .replace("<ID_TOKEN>", idToken),
      {
        email: emailValue,
      }
    );
  }

  deleteUserById(idToken: string, userId: string) {
    return axios.delete(
      process.env
        .REACT_APP_DB_API_ROUTE!.replace("<DB_ROUTE>", `/users/${userId}`)
        .replace("<ID_TOKEN>", idToken)
    );
  }

  requestPasswordResetRequestWhileLoggedIn(idToken: string) {
    return axios.put(
      process.env
        .REACT_APP_DB_API_ROUTE!.replace("<DB_ROUTE>", "/users")
        .replace("<ID_TOKEN>", idToken)
    );
  }

  requestPasswordResetRequest(emailValue: string) {
    return axios.post(process.env.REACT_APP_REQUEST_PASSWORD_RESET_ROUTE!, {
      email: emailValue,
    });
  }
  passwordResetRequest(
    passwordResetToken: string,
    emailValue: string,
    passwordValue: string,
    passwordConfirmValue: string
  ) {
    return axios.post(process.env.REACT_APP_PASSWORD_RESET_ROUTE!, {
      email: emailValue,
      token: passwordResetToken,
      password: passwordValue,
      password_confirmation: passwordConfirmValue,
    });
  }
}

export default new UserRequestService();
