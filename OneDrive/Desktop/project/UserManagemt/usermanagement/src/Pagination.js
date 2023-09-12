// Pagination.js
import React from "react";
import "./Pagination.css"; // Import the CSS file for styling

const Pagination = ({ currentPage, totalUsers, usersPerPage, onPageChange }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      {pageNumbers.map((pageNumber) => (
        <span
          key={pageNumber}
          className={currentPage === pageNumber ? "active" : ""}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
