const User = require("../models/User");
const Borrow = require("../models/Borrow"); // Import the Borrow model

exports.getUsers = async (req, res) => {
  try {
    // Fetch all users excluding admins
    const users = await User.find({ role: { $ne: "admin" } });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserBorrowedBooks = async (req, res) => {
  const { id } = req.params;

  try {
    const borrowedBooks = await Borrow.find({
      userId: id, // Make sure you're querying by userId
      returned: false,
    })
      .populate("bookId")
      .populate("userId");

    res.json(borrowedBooks);
  } catch (error) {
    console.error("Error fetching borrowed books:", error); // Log error for debugging
    res.status(500).json({ message: error.message });
  }
};

exports.addUser = async (req, res) => {
  const { name, contact, address, cnic, email, password } = req.body;

  // Input validation
  if (!name || !contact || !address || !cnic || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new user instance
    const newUser = new User({ name, contact, address, cnic, email, password });

    // Save the user to the database (password hashing handled in the model)
    await newUser.save();

    // Respond with the newly created user (excluding the password)
    res.status(201).json({ ...newUser.toObject(), password: undefined });
  } catch (error) {
    console.error("Error adding user:", error);
    if (error.code === 11000) {
      const field = error.keyPattern.cnic ? "CNIC" : "Email";
      return res.status(400).json({ message: `${field} already exists` });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  // Prevent changing role to 'admin'
  if (req.body.role && req.body.role.toLowerCase() === "admin") {
    return res.status(400).json({ message: "Cannot assign admin role" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the updated user (excluding the password)
    res.json({ ...updatedUser.toObject(), password: undefined });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).json({ message: error.message });
  }
};
