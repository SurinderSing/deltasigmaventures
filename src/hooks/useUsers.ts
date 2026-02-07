import { useState, useCallback } from "react";
import { userService } from "../services";
import type { User, CreateUserDto, UpdateUserDto } from "../types";

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (data: CreateUserDto) => Promise<User | null>;
  editUser: (id: string, data: UpdateUserDto) => Promise<User | null>;
  removeUser: (id: string) => Promise<boolean>;
  clearError: () => void;
}

/**
 * Custom hook for managing user CRUD operations
 * Handles loading states, error handling, and data fetching
 */
export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  const fetchUsers = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch users";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = useCallback(
    async (data: CreateUserDto): Promise<User | null> => {
      setLoading(true);
      setError(null);
      try {
        const newUser = await userService.create(data);
        setUsers((prev) => [...prev, newUser]);
        return newUser;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to create user";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const editUser = useCallback(
    async (id: string, data: UpdateUserDto): Promise<User | null> => {
      setLoading(true);
      setError(null);
      try {
        const updatedUser = await userService.update(id, data);
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? updatedUser : user)),
        );
        return updatedUser;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to update user";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const removeUser = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await userService.delete(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete user";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    editUser,
    removeUser,
    clearError,
  };
}
