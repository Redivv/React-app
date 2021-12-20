import User from "./user";

type UserContextData = {
  deletableUsers: User[] | [] | null;
  taskAssignableUsers: User[] | [] | null;
  addUserByEmail: (userEmail: string) => void;
  fetchDeletableUsers: () => Promise<User[] | []>;
  deleteUserById: (userId: string) => Promise<User[] | []>;
  fetchTaskAssignableUsers: () => User[] | [];
};

export default UserContextData;
