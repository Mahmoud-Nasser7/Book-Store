import express from 'express';
import { addBook, getAllBooks } from '../Controllers/book.controller.js';
const router = express.Router();

router.post("/books", addBook);
router.get("/books", getAllBooks);

export default router;