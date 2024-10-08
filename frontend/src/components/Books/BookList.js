import React, { useEffect, useState } from "react";
import api from "../../api";
import "./BookList.css"; // Import the CSS file

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedBook, setEditedBook] = useState({});
  const [selectedBook, setSelectedBook] = useState(null); // For the modal

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await api.get("/books");
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Failed to delete the book:", error);
    }
  };

  const handleEditClick = (book) => {
    setEditMode(true);
    setEditedBook({ ...book });
    setSelectedBook(null); // Clear selectedBook to close the modal
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/books/${editedBook._id}`, editedBook);
      setBooks(
        books.map((book) =>
          book._id === editedBook._id ? response.data : book
        )
      );
      setEditMode(false);
      setEditedBook({});
      setSelectedBook(null); // Clear selectedBook to avoid showing modal
    } catch (error) {
      console.error("Failed to update the book:", error);
    }
  };

  const handleDetailsClick = async (bookId) => {
    try {
      const response = await api.get(`/books/${bookId}/borrowers`);
      setSelectedBook(response.data); // Store the fetched book details
    } catch (error) {
      console.error("Failed to fetch book details:", error);
    }
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="book-list-container">
      <h2>Books</h2>

      {editMode ? (
        <div className="edit-book-form">
          <h3>Edit Book</h3>
          <input
            name="title"
            value={editedBook.title}
            onChange={handleEditChange}
            placeholder="Title"
          />
          <input
            name="author"
            value={editedBook.author}
            onChange={handleEditChange}
            placeholder="Author"
          />
          <input
            name="isbn"
            value={editedBook.isbn}
            onChange={handleEditChange}
            placeholder="ISBN"
          />
          <input
            name="totalQuantity"
            value={editedBook.totalQuantity}
            onChange={handleEditChange}
            placeholder="Total Quantity"
            type="number"
          />
          <div className="button-group">
            <button onClick={handleUpdate}>Update Book</button>
            <button
              onClick={() => {
                setEditMode(false);
                setSelectedBook(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book._id} className="book-item">
              <div>
                <strong>Title:</strong> {book.title}
              </div>
              <div>
                <strong>Author:</strong> {book.author}
              </div>
              <div>
                <strong>Total Quantity:</strong> {book.totalQuantity}
              </div>
              <div>
                <strong>Available Quantity:</strong> {book.availableQuantity}
              </div>
              <div className="button-group">
                <button
                  className="details-button"
                  onClick={() => handleDetailsClick(book._id)}
                >
                  Details
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(book)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Book Details Modal */}
      {selectedBook && !editMode && (
        <div className="book-details-modal">
          <h3>Book Details</h3>
          <div>
            <strong>Title:</strong> {selectedBook.title}
          </div>
          <div>
            <strong>Author:</strong> {selectedBook.author}
          </div>
          <div>
            <strong>Total Quantity:</strong> {selectedBook.totalQuantity}
          </div>
          <div>
            <strong>Available Quantity:</strong>{" "}
            {selectedBook.availableQuantity}
          </div>
          <div>
            <strong>Borrowers:</strong>
            <ul>
              {selectedBook.borrowers &&
                selectedBook.borrowers.map((borrower) => (
                  <li key={borrower.userId}>
                    {borrower.userName} (Quantity: {borrower.quantity}, Due
                    Date: {new Date(borrower.dueDate).toLocaleDateString()})
                  </li>
                ))}
            </ul>
          </div>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default BookList;
