import axios from "axios";
import {
  addUser as addUserType,
  updateUser as updateUserType,
} from "../models/postModels/User";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getUsers = (page: number = 1) => api.get(`/members?page=${page}`);
export const getUserById = (id: number) => api.get(`/members/${id}`);
export const addUser = (user: addUserType) => api.post("/members", user);
export const updateUser = (id: number, user: updateUserType) =>
  api.put(`/members/${id}`, user);
export const deleteUser = (id: number) => api.delete(`/members/${id}`);
export const deleteUsers = (ids: number[]) =>
  api.post(`/members/delete-many`, { deletedUserIds: ids });
export const getRoles = () => api.get("/members/roles");
