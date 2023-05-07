export class PaginationRequestI {
  page?: number;
  perPage: number;
  sortBy?: string;
  desc?: boolean | string;
  search?: string;
  descending?: any;
}

export interface PaginationSelectI {
  pagination?: boolean;
  findOne?: boolean;
}

export interface PaginationResult<T> {
  result: T[];
  total: number;
}

export interface PaginationOptionsI {
  perPage: number;
  desc: string;
  sortBy: string;
  offset: number;
  filters?: any;
  searchValue?: string;
}
