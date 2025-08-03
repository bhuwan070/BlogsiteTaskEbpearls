import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

export const searchPostsByTags = async (req, res, next) => {
  try {
    const { tags } = req.query;

    if (!tags) {
      return next(new ApiError(400, 'Tags parameter is required'));
    }

    // Convert comma-separated string to array if needed
    const tagArray = Array.isArray(tags) ? tags : tags.split(',');

    const posts = await Post.find({
      tags: { $in: tagArray },
    })
      .populate('author', 'username')
      .populate('comments.author', 'username');

    if (!posts || posts.length == 0) {
      return next(new ApiError(404, 'No posts found with the specified tags'));
    }
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

export const searchPostsByTitle = async (req, res, next) => {
  try {
    const { title } = req.query;

    if (!title) {
      return next(new ApiError(400, 'Title parameter is required'));
    }

    const regex = new RegExp(title, 'i'); // Case-insensitive search
    const posts = await Post.find({ title: regex })
      .populate('author', 'username')
      .populate('comments.author', 'username');

    if (!posts || posts.length == 0) {
      return next(new ApiError(404, 'No posts found with the specified title'));
    }
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

export const searchPostsByAuthor = async (req, res, next) => {
  try {
    const { username } = req.query;

    if (!username) {
      return next(new ApiError(400, 'Username parameter is required'));
    }

    const user = await User.findOne({ username });
    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    const posts = await Post.find({ author: user._id })
      .populate('author', 'username')
      .populate('comments.author', 'username');
    if (!posts || posts.length == 0) {
      return next(new ApiError(404, 'No posts found for this author'));
    }
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};
