import { Role } from "./Role";
import { Team } from "./Team";

export type User = {
  id: number;
  name: string;
  userName: string;
  avatar: string;
  isActive: boolean;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
  teams: Team[];
};
