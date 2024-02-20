export type User = {
  id?: number;
  name: string;
  description: string;
  photo: string;
};

export type UserState = {
  usersList: User[];
  isOpenDrawer: boolean;
};
