import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard";
import BookList from "./components/Books/BookList";
import UserList from "./components/Users/UserList";
import OverdueFines from "./components/OverdueFines";
import AddBook from "./components/Books/AddBook";
import AddUser from "./components/Users/AddUser";
import IssueBook from "./components/Books/IssueBook"; // Import IssueBook
import ReturnBook from "./components/Books/ReturnBook"; // Import ReturnBook
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="books" element={<BookList />} />
          <Route path="users" element={<UserList />} />
          <Route path="overdue-fines" element={<OverdueFines />} />
          <Route path="add-book" element={<AddBook />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="issue-book" element={<IssueBook />} />
          <Route path="return-book" element={<ReturnBook />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
