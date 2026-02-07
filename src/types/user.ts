/**
 * User entity interface - auto-generated from schema
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

/**
 * DTO for creating a new user (without id)
 */
export type CreateUserDto = Omit<User, "id">;

/**
 * DTO for updating a user (partial, without id)
 */
export type UpdateUserDto = Partial<CreateUserDto>;

/**
 * API response wrapper for error handling
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}
