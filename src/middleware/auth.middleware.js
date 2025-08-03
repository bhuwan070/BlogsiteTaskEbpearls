import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new ApiError(401, 'Not authorized, no token'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return next(new ApiError(401, 'Not authorized, invalid token'));
  }
};

export default protect;
