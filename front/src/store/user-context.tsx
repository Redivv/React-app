import React, { createContext, useContext, useState } from "react";
import UserRequestService from "../services/UserRequestService";
import User from "../types/user";
import UserContextData from "../types/userContextData";
import AuthContext from "./auth-context";

const UserContext = createContext<UserContextData>({
  availableUsers: [],
  fetchAvailableUsers: () => new Promise(() => []),
  addUserByEmail: () => {},
  deleteUserById: () => new Promise(() => []),
});

export const UserContextProvider: React.FC = (props) => {
  const authContext = useContext(AuthContext);
  const [availableUsers, setAvailableUsers] = useState<User[] | [] | null>(
    null
  );

  const addUserByEmail = async (userEmail: string) => {
    const response = await UserRequestService.addNewUserAccountRequest(
      authContext.accessToken!,
      userEmail
    );
    alert("Invitation email has been sent");
    if (!availableUsers) {
      await fetchAvailableUsers();
      return;
    }
    setAvailableUsers([...availableUsers, response.data]);
  };

  const fetchAvailableUsers = async () => {
    const response = await UserRequestService.getAllDeletableUsersRequest(
      authContext.accessToken!
    );
    setAvailableUsers(response.data);
    return response.data;
  };

  const deleteUserById = async (userId: string) => {
    await UserRequestService.deleteUserById(authContext.accessToken!, userId);
    let deletableUsersHelper = availableUsers!;
    deletableUsersHelper!.splice(
      deletableUsersHelper!.findIndex((item) => item.id == userId),
      1
    );
    setAvailableUsers([...deletableUsersHelper!]);
    alert("User deleted");
    return deletableUsersHelper;
  };

  const contextValues = {
    availableUsers: availableUsers,
    addUserByEmail: addUserByEmail,
    fetchAvailableUsers: fetchAvailableUsers,
    deleteUserById: deleteUserById,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
