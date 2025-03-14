import express from 'express';
import { addBook, deleteBook, getAllBooks, getSingleBook, updateBook } from '../Controllers/book.controller.js';
const router = express.Router();

router.post("/books", addBook);
router.get("/books", getAllBooks);
router.get("/books/:id", getSingleBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

export default router;