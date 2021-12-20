import React, { createContext, useContext, useState } from "react";
import UserRequestService from "../services/UserRequestService";
import User from "../types/user";
import UserContextData from "../types/userContextData";
import AuthContext from "./auth-context";

const UserContext = createContext<UserContextData>({
  deletableUsers: [],
  taskAssignableUsers: [],
  addUserByEmail: () => {},
  fetchDeletableUsers: () => new Promise(() => []),
  deleteUserById: () => new Promise(() => []),
  fetchTaskAssignableUsers: () => [],
});

export const UserContextProvider: React.FC = (props) => {
  const authContext = useContext(AuthContext);
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
    if (!deletableUsers) {
      await fetchDeletableUsers();
      return;
    }
    setDeletableUsers([...deletableUsers, response.data]);
  };

  const fetchDeletableUsers = async () => {
    const response = await UserRequestService.getAllDeletableUsersRequest(
      authContext.accessToken!
    );
    setDeletableUsers(response.data);
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
    alert("User deleted");
    return deletableUsersHelper;
  };

  const fetchTaskAssignableUsers = () => [];

  const contextValues = {
    deletableUsers: deletableUsers,
    taskAssignableUsers: taskAssignableUsers,
    addUserByEmail: addUserByEmail,
    fetchDeletableUsers: fetchDeletableUsers,
    deleteUserById: deleteUserById,
    fetchTaskAssignableUsers: fetchTaskAssignableUsers,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
