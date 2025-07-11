import express from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({
      error: true,
      message: error.message
    });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({
      error: true,
      message: error.message
    });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPostMessage = new PostMessage({ ...post, creatorToken: req.userId });
  try {
    await newPostMessage.save();
    res.status(201).json({
      success: true,
      newPostMessage,
      message: 'Post Created Successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { state, priority, feedback } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { state, priority, complaint_response: feedback, creatorToken: req.userId },
    { new: true }
  );
  res.json(updatedPost);
};

export const updateConvo = async (req, res) => {
  const { id } = req.params;
  const { sender, message } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedConvo = await PostMessage.findByIdAndUpdate(
    id,
    {
      $push: {
        conversation: {
          sender: sender,
          message: message,
          timestamp: new Date()
        }
      }
    },
    { new: true }
  );
  res.status(200).json({
    success: true,
    updatedConvo,
  });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);
  res.json({
    message: "Post deleted successfully."
  });
};

export default router;