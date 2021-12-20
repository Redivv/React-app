import User from "./user";

type UserContextData = {
  availableUsers: User[] | [] | null;
  fetchAvailableUsers: () => Promise<User[] | []>;
  addUserByEmail: (userEmail: string) => void;
  deleteUserById: (userId: string) => Promise<User[] | []>;
};

export default UserContextData;
