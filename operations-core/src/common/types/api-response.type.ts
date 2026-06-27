import { Pagination } from './pagination.type';

export interface ApiResponse<T> {
  success: boolean;

  statusCode: number;

  message?: string;

  data: T;

  timestamp: string;

  path: string;

  method: string;

  pagination?: Pagination;
}
