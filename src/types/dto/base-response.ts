// following the structure of the API responses from https://api.freeapi.app/api/v1
export type BaseResponse<T> = {
  statusCode: number;
  data: T;
  success: boolean;
  errors: [];
  message: string;
};

export type PaginationMeta = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  prevPage: number | null;
  serialNumberStartFrom: number;
  totalPages: number;
};

export type PaginatedResponse<
  ListKey extends string,
  TotalKey extends string,
  Item,
> = BaseResponse<
  PaginationMeta &
    { [K in ListKey]: Item[] } &
    { [K in TotalKey]: number }
>;
