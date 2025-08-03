import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('posts', 'title content tags createdAt updatedAt');

    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    res.status(200).json({
      success: true,
      user: {
        username: user.username,
        posts: user.posts,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
export const updateUserProfile = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    if (username) user.username = username;
    if (password) user.password = password;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};
