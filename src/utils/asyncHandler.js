const asyncHandler = (someFunction) => {
  return (req, res, next) => {
    Promise.resolve(someFunction(req, res, next)).catch((error) => next(error));
  };
};

export { asyncHandler };
