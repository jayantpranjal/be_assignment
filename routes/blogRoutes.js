import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getBlogs,
  getBlogById,
  deleteBlog,
  createBlog,
  updateBlog,
} from '../controllers/blogController.js';

const router = express.Router();

router.post('/', protect, createBlog);
router.get('/', protect, getBlogs);
router.get('/:id', protect, getBlogById);
router.delete('/:id', protect, deleteBlog);
router.put('/:id', protect, updateBlog);



export default router;
