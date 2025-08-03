import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

export const getPosts = async (req, res, next) => {
  try {
    // get all the posts
    const posts = await Post.find()
      .populate('author', 'username')
      .populate('comments.author', 'username');

    if (!posts || posts.length === 0) {
      return next(new ApiError(404, 'No posts found'));
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const existingPost = await Post.findById(req.params.id)
      .populate('author', 'username')
      .populate('comments.author', 'username');

    if (!existingPost) {
      return next(new ApiError(404, 'Post not found'));
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return next(new ApiError(400, 'Title and content are required'));
    }

    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    const post = new Post({
      title,
      content,
      author: userId,
      tags,
    });

    await post.save();

    await User.findByIdAndUpdate(
      userId,
      { $push: { posts: post._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return next(new ApiError(404, 'Post not found'));
    }

    if (post.author.toString() !== userId) {
      return next(
        new ApiError(403, 'You are not authorized to update this post')
      );
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;

    await post.save();

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return next(new ApiError(404, 'Post not found'));
    }

    if (post.author.toString() !== userId) {
      return next(
        new ApiError(403, 'You are not authorized to delete this post')
      );
    }

    await Post.findByIdAndDelete(postId);

    await User.findByIdAndUpdate(userId, {
      $pull: { posts: postId },
    });

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;
    const userId = req.user.id;

    if (!content) {
      return next(new ApiError(400, 'Comment content is required'));
    }

    const post = await Post.findById(postId);
    if (!post) {
      return next(new ApiError(404, 'Post not found'));
    }

    const newComment = {
      content,
      author: userId,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    const updatedPost = await Post.findById(postId)
      .populate('author', 'username')
      .populate('comments.author', 'username');

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      post: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};
