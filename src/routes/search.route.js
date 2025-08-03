import express from 'express';
import {
  searchPostsByAuthor,
  searchPostsByTags,
  searchPostsByTitle,
} from '../controllers/search.controller.js';

const router = express.Router();

router.get('/author', searchPostsByAuthor);
router.get('/tags', searchPostsByTags);
router.get('/title', searchPostsByTitle);

export default router;
