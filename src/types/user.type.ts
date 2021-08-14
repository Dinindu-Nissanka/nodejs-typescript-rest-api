export type User = {
  name: string;
  email: string;
  id: string;
  role: string;
};

export type UserCreateInput = {
  name: string;
  email: string;
  password: string;
  role?: string;
};

export type UserLoginInput = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  token: string;
};
