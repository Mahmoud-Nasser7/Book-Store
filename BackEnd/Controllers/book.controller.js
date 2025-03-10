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
export const getSingleBook = async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      status: "fail",
      data: { error: "Invalid book ID format" },
    });
  }

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        status: "fail",
        data: { error: "Book not found" },
      });
    }

    return res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred while fetching the book",
      data: { error: error.message },
    });
  }
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        status: "fail",
        data: { error: "Invalid book ID format" },
      });
    }
  
    const { title, author, publicationYear } = req.body;
      if (
      !title ||
      !author ||
      !publicationYear ||
      title.trim() === "" ||
      author.trim() === "" 
    ) {
      return res.status(400).json({
        status: "fail",
        data: { error: "All fields are required" },
      });
    }
  
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { title, author, publicationYear },
        { new: true, runValidators: true } 
      );
  
      if (!updatedBook) {
        return res.status(404).json({
          status: "fail",
          data: { error: "Book not found" },
        });
      }
  
      return res.status(200).json({
        status: "success",
        data: updatedBook,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "An unexpected error occurred while updating the book",
        data: { error: error.message },
      });
    }
  };
  
