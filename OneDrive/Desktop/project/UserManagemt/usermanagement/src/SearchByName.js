import React from "react";

const SearchByName = ({ filterTerm, onFilterChange }) => {
  return (
    <>
      <div className="filtercontainer">
        <input
          type="text"
          placeholder="Search By Name"
          value={filterTerm}
          onChange={onFilterChange}
        />
      </div>
    </>
  );
};

export default SearchByName;
