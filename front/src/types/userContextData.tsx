import User from "./user";

type UserContextData = {
  deletableUsers: User[] | [] | null;
  taskAssignableUsers: User[] | [] | null;
  fetchDeletableUsers: () => Promise<User[] | []>;
  fetchTaskAssignableUsers: () => Promise<User[] | []>;
  addUserByEmail: (userEmail: string) => void;
  deleteUserById: (userId: string) => Promise<User[] | []>;
};

export default UserContextData;
