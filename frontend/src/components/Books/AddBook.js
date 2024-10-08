import React, { useState } from "react";
import api from "../../api";
import "./AddBook.css"; // Import the CSS file

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/books", { title, author, isbn, totalQuantity });
    // Reset fields after submission
    setTitle("");
    setAuthor("");
    setIsbn("");
    setTotalQuantity(1);
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="form-input"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
          className="form-input"
        />
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="ISBN"
          required
          className="form-input"
        />
        <input
          type="number"
          value={totalQuantity}
          onChange={(e) => setTotalQuantity(e.target.value)}
          placeholder="Total Quantity"
          required
          className="form-input"
        />
        <button type="submit" className="submit-button">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
