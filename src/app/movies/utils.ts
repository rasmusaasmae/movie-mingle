import { z } from "zod";

const QUERY = "q";
const querySchema = z.string();

const PAGE = "page";
const PAGE_DEFAULT = 1;
const pageSchema = z.string().regex(/^\d+$/).transform(Number);

const SORTBY = "sortBy";
const SORTBY_DEFAULT = "average_rating";
const sortbySchema = z.enum([
  "average_rating",
  "user_rating",
  "imdb_rating",
  "runtime",
  "year",
]);
export type SortBy = z.infer<typeof sortbySchema>;

const ORDER = "order";
const ORDER_DEFAULT = "desc";
const orderSchema = z.enum(["asc", "desc"]);
export type Order = z.infer<typeof orderSchema>;

export function createSearchParams(
  previousSearchParams?: URLSearchParams,
  query?: string,
  page?: number,
  sortBy?: SortBy,
  order?: Order,
) {
  const params = new URLSearchParams(previousSearchParams);

  if (query !== undefined && query !== "") params.set(QUERY, query);
  else params.delete(QUERY);

  if (page !== undefined && page !== PAGE_DEFAULT)
    params.set(PAGE, String(page));
  else params.delete(PAGE);

  if (sortBy !== undefined && sortBy !== SORTBY_DEFAULT)
    params.set(SORTBY, sortBy);
  else params.delete(SORTBY);

  if (order !== undefined && order !== ORDER_DEFAULT) params.set(ORDER, order);
  else params.delete(ORDER);

  return params;
}

export function parseSearchParams(searchParams?: {
  [key: string]: string | string[] | undefined;
}) {
  const queryParam = querySchema.safeParse(searchParams?.[QUERY]);
  const query = queryParam.success ? queryParam.data : undefined;

  const pageParam = pageSchema.safeParse(searchParams?.[PAGE]);
  const page = pageParam.success ? pageParam.data : 1;

  const sortByParam = sortbySchema.safeParse(searchParams?.[SORTBY]);
  const sortBy = sortByParam.success ? sortByParam.data : "average_rating";

  const orderParam = orderSchema.safeParse(searchParams?.[ORDER]);
  const order = orderParam.success ? orderParam.data : "desc";
  return { query, page, sortBy, order };
}
