import { api } from "./api";
import type { User, CreateUserDto, UpdateUserDto } from "../types";

const ENDPOINT = "/users";

/**
 * User API service
 * All user CRUD operations are handled here
 */
export const userService = {
  /**
   * Get all users
   */
  getAll: async (): Promise<User[]> => {
    return api.get<User[]>(ENDPOINT);
  },

  /**
   * Get a single user by ID
   */
  getById: async (id: string): Promise<User> => {
    return api.get<User>(`${ENDPOINT}/${id}`);
  },

  /**
   * Create a new user
   */
  create: async (data: CreateUserDto): Promise<User> => {
    return api.post<User>(ENDPOINT, data);
  },

  /**
   * Update an existing user
   */
  update: async (id: string, data: UpdateUserDto): Promise<User> => {
    return api.put<User>(`${ENDPOINT}/${id}`, data);
  },

  /**
   * Delete a user
   */
  delete: async (id: string): Promise<void> => {
    await api.delete<Record<string, never>>(`${ENDPOINT}/${id}`);
  },
};
