import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Adjust the path as necessary
import "./Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const [totalBooks, setTotalBooks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage

        const booksResponse = await fetch("http://localhost:5000/api/books", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Add token to the headers
          },
        });

        const usersResponse = await fetch("http://localhost:5000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Add token to the headers
          },
        });

        if (!booksResponse.ok || !usersResponse.ok) {
          throw new Error("Failed to fetch counts");
        }

        const books = await booksResponse.json();
        const users = await usersResponse.json();

        setTotalBooks(books.length); // Assuming the response is an array
        setTotalUsers(users.length); // Assuming the response is an array
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/"); // Redirect to the login page
  };

  // Check if the current path is '/dashboard/'
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="dashboard-container">
      <h2>Library Management System</h2>
      <nav>
        <Link to="http://localhost:3000/dashboard">Home</Link>
        <Link to="add-book">Add Book</Link>
        <Link to="books">Manage Books</Link>
        <Link to="issue-book">Issue Book</Link>
        <Link to="return-book">Return Book</Link>
        <Link to="overdue-fines">Overdue Fines</Link>
        <Link to="add-user">Add User</Link>
        <Link to="users">Manage Users</Link>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      {isDashboard && ( // Conditionally render cards based on the current path
        <div className="cards-container">
          <div className="card">
            <h3>Total Books</h3>
            <p>{totalBooks}</p>
          </div>
          <div className="card">
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default Dashboard;
