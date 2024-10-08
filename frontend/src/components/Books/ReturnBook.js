import React, { useState, useEffect } from "react";
import api from "../../api";
import "./ReturnBook.css"; // Import the CSS file for styling

const ReturnBook = () => {
  const [books, setBooks] = useState([]); // For all books
  const [users, setUsers] = useState([]); // For all users
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success messages

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books"); // Fetch all books
        setBooks(response.data);
      } catch (err) {
        setError("Failed to fetch books. Please try again.");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await api.get("/users"); // Fetch all users
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
      }
    };

    fetchBooks();
    fetchUsers();
  }, []);

  const handleReturn = async (e) => {
    e.preventDefault();

    if (!selectedBook || !selectedUser) {
      setError("Please select a valid book and user.");
      return;
    }

    try {
      await api.post("/issues/return", {
        bookId: selectedBook,
        userId: selectedUser,
        quantity,
      });
      setSuccess("Book returned successfully!");
      setSelectedBook("");
      setSelectedUser("");
      setQuantity(1);
      setError(""); // Reset error message
    } catch (err) {
      setError("Failed to return the book. Please try again.");
      setSuccess(""); // Reset success message
    }
  };

  return (
    <form className="return-book-form" onSubmit={handleReturn}>
      <h2>Return Book</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <select
        value={selectedBook}
        onChange={(e) => setSelectedBook(e.target.value)}
        required
      >
        <option value="">Select Book</option>
        {books.map((book) => (
          <option key={book._id} value={book._id}>
            {book.title}
          </option>
        ))}
      </select>

      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        required
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
        required
      />
      <button type="submit">Return Book</button>
    </form>
  );
};

export default ReturnBook;
