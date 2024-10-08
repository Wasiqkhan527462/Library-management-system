const Book = require("../models/Book");
const Borrow = require("../models/Borrow");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookDetailsWithBorrowers = async (req, res) => {
  const { id } = req.params; // Get the book ID from the request parameters

  try {
    // Find the book by its ID
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Find all borrow records for this book
    const borrowRecords = await Borrow.find({ bookId: id, returned: false })
      .populate("userId") // Populate user details
      .select("userId quantity dueDate"); // Select relevant fields

    // Combine book details with borrow records
    const bookDetails = {
      ...book.toObject(),
      borrowers: borrowRecords.map((record) => ({
        userId: record.userId._id,
        userName: record.userId.name,
        quantity: record.quantity,
        dueDate: record.dueDate,
      })),
    };

    res.json(bookDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addBook = async (req, res) => {
  const { title, author, isbn, totalQuantity } = req.body;

  // Input validation
  if (!title || !author || !isbn || totalQuantity === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new book instance
    const newBook = new Book({
      title,
      author,
      isbn,
      totalQuantity,
      availableQuantity: totalQuantity, // Set available quantity to total quantity
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
