import { PaginationRequestI, PaginationOptionsI } from "./pagination.interface";

export const configPagination = (
  paginationOptions: PaginationRequestI
): PaginationOptionsI => {
  let { page, perPage, sortBy = "id", desc, search } = paginationOptions;
  page = page == 0 ? 1 : page;

  const offset = +page! === 1 ? 0 : (page! - 1) * perPage!;

  const pagination: { sortBy: string; desc: string } = {
    sortBy: sortBy || "id",
    desc: desc === "1" ? "DESC" : "ASC",
  };
  const filters: any = { ...paginationOptions };
  const searchValue: string | undefined = search;
  delete filters.page;
  delete filters.perPage;
  delete filters.sortBy;
  delete filters.desc;
  delete filters.search;
  delete filters.descending;

  return {
    offset,
    perPage,
    desc: pagination.desc,
    sortBy: pagination.sortBy,
    filters,
    searchValue,
  };
};
