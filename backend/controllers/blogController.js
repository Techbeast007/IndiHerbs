import express from 'express';
import BlogPost from '../models/blogModel.js';

const router = express.Router();

// Get all blog posts
export const getAllBlogPosts = (req, res) => {
  BlogPost.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json({ error: err.message }));
};

// Get a single blog post
export const getBlogPost = (req, res) => {
  BlogPost.findById(req.params.id)
    .then(post => {
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.json(post);
    })
    .catch(err => res.status(400).json({ error: err.message }));
};

// Create a new blog post
export const createBlogPost = (req, res) => {
    console.log(req)
    console.log(req.body.user.isAdmin)
  if (!req.body.user || !req.body.user.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const newPost = new BlogPost({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image
  });

  newPost.save()
    .then(post => res.json(post))
    .catch(err => res.status(400).json({ error: err.message }));
};

// Update a blog post
export const updateBlogPost = (req, res) => {
  if (!req.body.user || !req.body.user.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  BlogPost.findById(req.params.id)
    .then(post => {
      if (!post) return res.status(404).json({ error: 'Post not found' });
      post.title = req.body.title || post.title;
      post.description = req.body.description || post.description;
      post.images = req.body.images || post.images;
      return post.save();
    })
    .then(post => res.json(post))
    .catch(err => res.status(400).json({ error: err.message }));
};

// Delete a blog post
export const deleteBlogPost = (req, res) => {
  
  // if (!req.body.user || !req.body.user.isAdmin) {
  //   return res.status(401).json({ error: 'Unauthorized' });
  // }

  BlogPost.findByIdAndDelete(req.params.id)
    .then(post => {
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.json({ message: 'Post deleted' });
    })
    .catch(err => res.status(400).json({ error: err.message }));
};
