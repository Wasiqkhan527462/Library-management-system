const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

exports.issueBook = async (req, res) => {
  const { bookId, userId, quantity } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book || book.availableQuantity < quantity) {
      return res.status(400).json({ message: "Not enough copies available" });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // Set due date to 14 days from now

    const borrow = new Borrow({ userId, bookId, quantity, dueDate });
    await borrow.save();

    // Update the book's available quantity
    book.availableQuantity -= quantity;
    await book.save();

    res.status(201).json({ message: "Book(s) issued successfully", dueDate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.returnBook = async (req, res) => {
  const { bookId, userId, quantity } = req.body;

  try {
    const borrowRecord = await Borrow.findOne({
      userId,
      bookId,
      returned: false,
      quantity: { $gte: quantity }, // Ensure the user borrowed at least this quantity
    });

    if (!borrowRecord) {
      return res
        .status(404)
        .json({ message: "Borrow record not found or already returned" });
    }

    borrowRecord.quantity -= quantity;

    // If quantity is zero, either delete the record or mark it as returned
    if (borrowRecord.quantity <= 0) {
      borrowRecord.returned = true; // Mark as returned
      await borrowRecord.save(); // Save the change
      await Borrow.deleteOne({ _id: borrowRecord._id }); // Remove record from DB
    } else {
      await borrowRecord.save(); // Just save the updated quantity
    }

    const book = await Book.findById(bookId);
    if (book) {
      book.availableQuantity += quantity;
      await book.save();
    }

    res.json({ message: "Book(s) returned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOverdueFines = async (req, res) => {
  const today = new Date();
  try {
    const overdueRecords = await Borrow.find({
      dueDate: { $lt: today },
      returned: false,
    })
      .populate("userId")
      .populate("bookId");

    const fines = overdueRecords.map((record) => ({
      userId: record.userId._id,
      userName: record.userId.name,
      bookTitle: record.bookId.title,
      overdueDays: Math.floor((today - record.dueDate) / (1000 * 60 * 60 * 24)),
      fineAmount:
        Math.floor((today - record.dueDate) / (1000 * 60 * 60 * 24)) * 5, // Example fine calculation
    }));

    res.json(fines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
