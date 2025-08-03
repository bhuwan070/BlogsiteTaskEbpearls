import express from 'express';
import {
  getPosts,
  createPost,
  addComment,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/post.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getPosts);

router.post('/', protect, createPost);

router.get('/:id', getPostById);

router.put('/:id', protect, updatePost);

router.delete('/:id', protect, deletePost);

router.post('/:id/comment', protect, addComment);

export default router;
