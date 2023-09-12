import React from "react";
import "./FilterUsers.css"

const FilterUsers = ({
  filterDomain,
  onFilterDomainChange,
  filterGender,
  onFilterGenderChange,
  filterAvailability,
  onFilterAvailabilityChange,
}) => {
  return (
    <div>
      <div className="filter-container">
        <h4>Filter By Domain</h4>
        <select value={filterDomain} onChange={onFilterDomainChange}>
          <option value="">All</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          {/* Add more domain options as needed */}
        </select>
      </div>
      <div className="filter-container">
        <h4>Filter By Gender</h4>
        <select value={filterGender} onChange={onFilterGenderChange}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          {/* Add more gender options as needed */}
        </select>
      </div>
      <div className="filter-container">
        <h4>Filter By Availability</h4>
        <select value={filterAvailability} onChange={onFilterAvailabilityChange}>
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>
    </div>
  );
};

export default FilterUsers;
