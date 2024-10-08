import React, { useEffect, useState } from "react";
import api from "../../api";
import "./UserList.css"; // Import the CSS file for styling

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [selectedUserBooks, setSelectedUserBooks] = useState(null); // State for selected user's borrowed books

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setContact(user.contact);
    setAddress(user.address);
    setCnic(user.cnic);
    setEmail(user.email);
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = { name, contact, address, cnic, email };
      await api.put(`/users/${editingUser._id}`, updatedUser);
      setUsers(
        users.map((user) =>
          user._id === editingUser._id ? { ...user, ...updatedUser } : user
        )
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDetailsClick = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/borrowed-books`);
      setSelectedUserBooks(response.data); // Store the fetched books
    } catch (error) {
      console.error("Failed to fetch borrowed books:", error);
    }
  };

  const closeModal = () => {
    setSelectedUserBooks(null); // Close the modal by clearing the state
  };

  return (
    <div className="user-list-container">
      <h2>Users</h2>
      {editingUser ? (
        <div className="user-edit-form">
          <h3>Edit User</h3>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <input
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            placeholder="CNIC"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <button onClick={handleUpdate}>Update User</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user._id} className="user-item">
              <div>
                <strong>Name:</strong> {user.name}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Contact:</strong> {user.contact}
              </div>
              <div>
                <strong>Address:</strong> {user.address}
              </div>
              <div>
                <strong>CNIC:</strong> {user.cnic}
              </div>
              <div className="button-group">
                <button
                  className="details-button"
                  onClick={() => handleDetailsClick(user._id)}
                >
                  Details
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Borrowed Books Modal */}
      {selectedUserBooks && (
        <div className="user-books-modal">
          <h3>Borrowed Books</h3>
          <ul>
            {selectedUserBooks.map((book) => (
              <li key={book.bookId._id}>
                <strong>Title:</strong> {book.bookId.title} (Quantity:{" "}
                {book.quantity}, Due Date:{" "}
                {new Date(book.dueDate).toLocaleDateString()})
              </li>
            ))}
          </ul>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default UserList;
