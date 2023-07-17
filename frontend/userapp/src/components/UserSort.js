import React, { useState } from 'react';

const UserSort = ({ users, onSortByAge, onSortByName }) => {
  const [sortBy, setSortBy] = useState(null);

  const handleSortByAge = () => {
    setSortBy('age');
    onSortByAge();
  };

  const handleSortByName = () => {
    setSortBy('name');
    onSortByName();
  };

  return (
    <div className='sortBtn'>
      <button onClick={handleSortByAge}>Sort by Age</button>
      <button onClick={handleSortByName}>Sort by Name</button>
      {sortBy && <p>Sorting by: {sortBy}</p>}
    </div>
  );
};

export default UserSort;
