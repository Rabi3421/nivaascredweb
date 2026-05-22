/**
 * Generic wrapper for all API responses.
 * Every route returns { success, message, data } or { success, error, errors }.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string>; // field-level validation errors
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/** Standard query params for list endpoints */
export interface ListQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
