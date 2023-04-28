// this middelware always must be used at last

// And this should be used with custom class error handler in uitls

const ErrorMiddelware = (err, req, res, next) => {
  (err.statusCode = err.statusCode || 500),
    (err.message = err.message || "Internal Server Error"),
    res.status(err.statusCode).json({
      succes: false,
      message: err.message,
    });
};

export default ErrorMiddelware;
