export const pageNotFound = (request, response, next) => {
  const error = new Error(`Not found - ${request.originalUrl}`);
  response.status(404);
  next(error);
}

export const errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode;
  // console.log({ 
  //   message: error.message, 
  //   stack: error.stack
  // });
  response.status(statusCode).send({ message: error.message });
}

export const asyncHandler = (controller) => {
  return async (request, response, next) => {
    try {
      await controller(request, response, next);
    } catch (error) {
      next(error);
    }
  }
}