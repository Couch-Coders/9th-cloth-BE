import { IPaginationOptions } from './types/pagination-options';

export const infinityPagination = <T>(
  items: T[],
  options: IPaginationOptions,
) => {
  return {
    items,
    hasNextPage: items.length === options.limit,
  };
};