import React, { createContext, useContext, useState } from "react";
import UserRequestService from "../services/UserRequestService";
import User from "../types/user";
import UserContextData from "../types/userContextData";
import AuthContext from "./auth-context";
import OrderContext from "./order-context";

const UserContext = createContext<UserContextData>({
  deletableUsers: [],
  taskAssignableUsers: [],
  fetchDeletableUsers: () => new Promise(() => []),
  fetchTaskAssignableUsers: () => new Promise(() => []),
  addUserByEmail: () => {},
  deleteUserById: () => new Promise(() => []),
});

export const UserContextProvider: React.FC = (props) => {
  const authContext = useContext(AuthContext);
  const orderContext = useContext(OrderContext);
  const [deletableUsers, setDeletableUsers] = useState<User[] | [] | null>(
    null
  );
  const [taskAssignableUsers, setTaskAssignableUsers] = useState<
    User[] | [] | null
  >(null);

  const addUserByEmail = async (userEmail: string) => {
    const response = await UserRequestService.addNewUserAccountRequest(
      authContext.accessToken!,
      userEmail
    );
    alert("Invitation email has been sent");
    if (deletableUsers) {
      setDeletableUsers([...deletableUsers, response.data]);
    }
    if (taskAssignableUsers) {
      setTaskAssignableUsers([...taskAssignableUsers, response.data]);
    }
  };

  const fetchDeletableUsers = async () => {
    const response = await UserRequestService.getAllDeletableUsersRequest(
      authContext.accessToken!
    );
    setDeletableUsers(response.data);
    return response.data;
  };

  const fetchTaskAssignableUsers = async () => {
    const response = await UserRequestService.getAllTaskAssignableUsersRequest(
      authContext.accessToken!
    );
    setTaskAssignableUsers(response.data);
    return response.data;
  };

  const deleteUserById = async (userId: string) => {
    await UserRequestService.deleteUserById(authContext.accessToken!, userId);
    let deletableUsersHelper = deletableUsers!;
    deletableUsersHelper!.splice(
      deletableUsersHelper!.findIndex((item) => item.id == userId),
      1
    );
    setDeletableUsers([...deletableUsersHelper!]);
    if (taskAssignableUsers) {
      let taskAssignableUsersHelper = taskAssignableUsers;
      taskAssignableUsersHelper!.splice(
        taskAssignableUsersHelper!.findIndex((item) => item.id == userId),
        1
      );
      setTaskAssignableUsers([...taskAssignableUsersHelper]);
    }
    orderContext.setOrdersAreBeingLoaded();
    orderContext.searchOrders(null, true, false);
    alert("User deleted");
    return deletableUsersHelper;
  };

  const contextValues = {
    deletableUsers: deletableUsers,
    taskAssignableUsers: taskAssignableUsers,
    addUserByEmail: addUserByEmail,
    fetchDeletableUsers: fetchDeletableUsers,
    fetchTaskAssignableUsers: fetchTaskAssignableUsers,
    deleteUserById: deleteUserById,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
