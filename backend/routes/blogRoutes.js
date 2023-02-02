
import express from 'express';
import {getAllBlogPosts,getBlogPost,createBlogPost,updateBlogPost,deleteBlogPost} from '../controllers/blogController.js';

const router = express.Router();

// Get all blog posts
router.get('/',getAllBlogPosts);

// Get a single blog post
router.get('/:id',getBlogPost);

// Create a new blog post
router.post('/',createBlogPost);

// Update a blog post
router.put('/:id',updateBlogPost);

// Delete a blog post
router.delete('/:id',deleteBlogPost);

export default router;