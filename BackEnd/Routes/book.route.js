import express from 'express';
import { addBook } from '../Controllers/book.controller.js';
const router = express.Router();

router.post("/books", addBook);

export default router;