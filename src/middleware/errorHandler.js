const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Handle ApiError
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      message: message.join(', '),
    });
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    message: 'Server Error',
  });
};

export default errorHandler;
