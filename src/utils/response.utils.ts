interface ApiResponse {
  statusCode: number;
  error: boolean;
  message: string;
  data?: any;
  pagination?: any;
}

export const successResponse = (
  statusCode: number,
  error: boolean,
  message: string,
  data?: any,
  pagination?: any
): ApiResponse => {
  const response: ApiResponse = {
    statusCode,
    error,
    message,
    data,
  };

  if (pagination) {
    response.pagination = pagination;
  }
  return response;
};

export const errorResponse = (
  statusCode: number,
  error: boolean,
  message: string,
  data?: any
): ApiResponse => {
  return {
    statusCode,
    error,
    message,
    data,
  };
};
