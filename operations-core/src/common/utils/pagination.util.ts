import { PaginationDto } from '../dto/pagination.dto';

export interface PaginationResult<T> {
  data: T;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class PaginationUtil {
  static paginate<T>(
    data: T,
    total: number,
    pagination: PaginationDto,
  ): PaginationResult<T> {
    const page = pagination.page || 1;

    const limit = pagination.limit || 10;

    return {
      data,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static skip(pagination: PaginationDto): number {
    return (pagination.page - 1) * pagination.limit;
  }

  static take(pagination: PaginationDto): number {
    return pagination.limit;
  }
}
