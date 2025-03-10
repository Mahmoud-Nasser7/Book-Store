import Book from "../models/book.model.js";

export const addBook = async (req, res) => {
  const { title, author, publicationYear } = req.body;
  if (
    !title ||
    !author ||
    !publicationYear ||
    title.trim() === "" ||
    author.trim() === "" ||
    publicationYear.trim() === ""
  ) {
    return res.status(400).json({
      status: "fail",
      data: { error: "All fields are required" },
    });
  }
  try {
    const existingBook = await Book.findOne({ title, author, publicationYear });
    if (existingBook) {
      return res.status(400).json({
        status: "fail",
        data: { error: "Book already exists" },
      });
    }
    const newBook = new Book(req.body);
    await newBook.save();

    return res.status(201).json({
      status: "success",
      data: newBook,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
      data: { error: error.message },
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    if (books.length === 0) {
      return res.status(200).json({
        status: "success",
        data: [],
        message: "No books found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred while fetching books",
      data: { error: error.message },
    });
  }
};
