import React, { useEffect, useState } from "react";
import api from "../api";
import "./OverdueFines.css"; // Import the CSS file

const OverdueFines = () => {
  const [fines, setFines] = useState([]);

  useEffect(() => {
    const fetchFines = async () => {
      const response = await api.get("/issues/overdue-fines");
      setFines(response.data);
    };
    fetchFines();
  }, []);

  return (
    <div className="overdue-fines-container">
      <h2>Overdue Fines</h2>
      <ul>
        {fines.map((fine) => (
          <li key={fine.userId} className="fine-item">
            <span className="user-info">User: {fine.userName}</span>
            <span className="book-info">Book: {fine.bookTitle}</span>
            <span className="overdue-days">
              Overdue Days: {fine.overdueDays}
            </span>
            <span className="fine-amount">Fine: ${fine.fineAmount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverdueFines;
