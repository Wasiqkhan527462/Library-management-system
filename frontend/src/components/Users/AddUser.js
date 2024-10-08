import React, { useState } from "react";
import api from "../../api";
import "./AddUser.css"; // Import the CSS file

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [cnic, setCnic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/users", { name, email, password, contact, address, cnic });
    // Reset fields after submission
    setName("");
    setEmail("");
    setPassword("");
    setContact("");
    setAddress("");
    setCnic("");
  };

  return (
    <div className="add-user-container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Contact"
          required
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
        />
        <input
          type="text"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          placeholder="CNIC"
          required
        />
        <button className="adduser" type="submit">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
