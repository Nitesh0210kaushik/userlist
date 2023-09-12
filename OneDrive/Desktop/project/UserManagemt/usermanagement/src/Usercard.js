import React, { useEffect, useState } from "react";
import "./UserCard.css"; // Import the CSS file for styling
import Pagination from "./Pagination";
import SearchByName from "./SearchByName";
import FilterUsers from "./FilterUsers";

const Usercard = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;
  const [loading, setLoading] = useState(true);
  const [filterTerm, setFilterTerm] = useState('');
  const [filterDomain, setFilterDomain] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Replace this with your API endpoint
      const response = await fetch("http://localhost:5000/api/fetch-data");

      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data", error);
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterByName = (e) => {
    setFilterTerm(e.target.value);
  };

  const handleFilterByDomain = (e) => {
    setFilterDomain(e.target.value);
  };

  const handleFilterByGender = (e) => {
    setFilterGender(e.target.value);
  };

  const handleFilterByAvailability = (e) => {
    setFilterAvailability(e.target.value);
  };

  const filteredUsers = data.filter((user) => {
    const nameMatch = user.first_name.toLowerCase().includes(filterTerm.toLowerCase());
    const domainMatch = filterDomain ? user.domain === filterDomain : true;
    const genderMatch = filterGender ? user.gender === filterGender : true;
    const availabilityMatch = filterAvailability ? user.available === (filterAvailability === 'true') : true;
    return nameMatch && domainMatch && genderMatch && availabilityMatch;
  });

  const currentUsers = Array.isArray(filteredUsers)
    ? filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
    : [];

  return (
    <div>
      <SearchByName filterTerm={filterTerm} onFilterChange={handleFilterByName} />
      <FilterUsers
        filterDomain={filterDomain}
        onFilterDomainChange={handleFilterByDomain}
        filterGender={filterGender}
        onFilterGenderChange={handleFilterByGender}
        filterAvailability={filterAvailability}
        onFilterAvailabilityChange={handleFilterByAvailability}
      />
      {loading ? (
        <div>Loading...</div>
      ) : filteredUsers.length === 0 ? (
        <div>No users found.</div>
      ) : (
        <div>
          <div className="user-card-container">
            {currentUsers.map((item) => (
              <div key={item.id} className="user-card">
                <div className="user-avatar">
                  <img src={item.avatar} alt={`Avatar of ${item.first_name}`} />
                </div>
                <div className="user-details">
                  <h2>
                    <strong>ID :</strong> {item.id}
                  </h2>
                  <h2>
                    {item.first_name} {item.last_name}
                  </h2>
                  <p>
                    <strong>Email:</strong> {item.email}
                  </p>
                  <p>
                    <strong>Gender:</strong> {item.gender}
                  </p>
                  <p>
                    <strong>Domain:</strong> {item.domain}
                  </p>
                  <p>
                    <strong>Available:</strong>{" "}
                    {item.available ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalUsers={filteredUsers.length}
            usersPerPage={usersPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Usercard;
