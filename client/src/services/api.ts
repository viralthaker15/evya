import axios from "axios";
import {
  addUser as addUserType,
  updateUser as updateUserType,
} from "../models/postModels/User";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getUsers = (page: number = 1) =>
  api.get(`/api/members?page=${page}`);
export const getUserById = (id: number) => api.get(`/api/members/${id}`);
export const addUser = (user: addUserType) => api.post("/api/members", user);
export const updateUser = (id: number, user: updateUserType) =>
  api.put(`/api/members/${id}`, user);
export const deleteUser = (id: number) => api.delete(`/api/members/${id}`);
export const deleteUsers = (ids: number[]) =>
  api.post(`/api/members/delete-many`, { deletedUserIds: ids });
export const getRoles = () => api.get("/api/members/roles");
