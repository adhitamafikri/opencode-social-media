export type RegisterRequest = {
  email: string;
  password: string;
  role: string;
  username: string;
};

export type LoginRequest = {
  password: string;
  username: string;
};
