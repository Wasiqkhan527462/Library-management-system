const express = require("express");
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserBorrowedBooks, // Correctly destructured
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.post("/", verifyToken, addUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id/borrowed-books", verifyToken, getUserBorrowedBooks); // Ensure this is correct

module.exports = router;
