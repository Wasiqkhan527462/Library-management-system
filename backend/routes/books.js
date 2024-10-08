const express = require("express");
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  getBookDetailsWithBorrowers, // Import the new function
} = require("../controllers/bookController");

const router = express.Router();

router.get("/", getBooks);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.get("/:id/borrowers", getBookDetailsWithBorrowers); // New route for book details with borrowers

module.exports = router;
