type UserRole = "ADMIN" | "BARBER" | "CLIENT";

type UserAPIResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
};
