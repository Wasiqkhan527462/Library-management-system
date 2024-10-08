const express = require("express");
const {
  issueBook,
  returnBook,
  getOverdueFines,
} = require("../controllers/issueController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/issue", verifyToken, issueBook);
router.post("/return", verifyToken, returnBook);
router.get("/overdue-fines", verifyToken, getOverdueFines);

module.exports = router;
