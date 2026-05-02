interface PaginationOptions {
  page?: number;
  limit?: number;
  totalItems?: number;
}

interface PaginationResult {
  skip: number;
  limit: number;
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

export const paginate = (options: PaginationOptions): PaginationResult => {
  const { page = 1, limit = 10, totalItems = 0 } = options;
  
  const currentPage = Math.max(parseInt(page.toString()) || 1, 1);
  const perPage = Math.max(parseInt(limit.toString()) || 10, 1);

  const totalPages = Math.ceil(totalItems / perPage) || 1;
  const skip = (currentPage - 1) * perPage;

  return {
    skip,
    limit: perPage,
    pagination: {
      totalItems,
      totalPages,
      currentPage,
      perPage,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null,
    },
  };
};
