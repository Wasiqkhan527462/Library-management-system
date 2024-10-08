import React, { useState, useEffect } from "react";
import api from "../../api";
import "./IssueBook.css"; // Import the CSS file for styling

const IssueBook = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [quantity, setQuantity] = useState(1); // Default quantity

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await api.get("/users");
      setUsers(response.data);
    };
    const fetchBooks = async () => {
      const response = await api.get("/books");
      setBooks(response.data);
    };
    fetchUsers();
    fetchBooks();
  }, []);

  const handleIssue = async (e) => {
    e.preventDefault();
    await api.post("/issues/issue", {
      userId: selectedUser,
      bookId: selectedBook,
      quantity,
    });
    // Reset selections after issuing
    setSelectedUser("");
    setSelectedBook("");
    setQuantity(1); // Reset quantity
  };

  return (
    <form className="issue-book-form" onSubmit={handleIssue}>
      <h2>Issue Book</h2>
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
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
        required
      />
      <button type="submit">Issue Book</button>
    </form>
  );
};

export default IssueBook;
