import express from 'express';
import auth from "../middleware/auth.js";

import { getPosts, getPost, createPost, updatePost, deletePost } from '../controller/post.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

export default router;
