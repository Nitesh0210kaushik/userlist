import React from 'react';

const UserFilter = ({ filterTerm, onFilterChange }) => {
  return (
    <div className="filter-container">
      <h4>Filter By Name</h4>
      <input
        type="text"
        
        placeholder="Filter by Name" 
        value={filterTerm}
        onChange={onFilterChange}
      />
    </div>
  );
};

export default UserFilter;
