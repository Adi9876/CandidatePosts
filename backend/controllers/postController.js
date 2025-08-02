import Post from "../models/postModel.js";

export const createPost = async (req, res) => {
  const post = new Post({ author: req.user.id, content: req.body.content, tags: req.body.tags });
  await post.save();
  res.status(201).json(post);
};

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "username name");
  res.json(posts);
};
