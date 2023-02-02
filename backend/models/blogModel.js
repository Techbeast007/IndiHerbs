import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: { type: String, required: true },
  alt_text: { type: String, required: true }
});

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    type: String,
    required: true,
  }
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
export default BlogPost;