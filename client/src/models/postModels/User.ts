export type addUser = {
  userDetails: {
    name: string;
    email: string;
    username: string;
    avatar?: string;
    roleId: number;
  };
  teamName?: string;
};

export type updateUser = {
  name?: string;
  email?: string;
  roleId?: number;
};
