import React, { useState } from 'react';

const UserUpdate = ({ user, onUpdateUser }) => {
  const [updateData, setUpdateData] = useState({
    name: user.name,
    email: user.email,
    age: user.age,
    address: user.address
  });

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/formusers/${user._id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      if (response.ok) {
        onUpdateUser();
      } else {
        console.error('Error updating user:', data.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <form onSubmit={handleUpdateUser}>
      <input
        type="text"
        value={updateData.name}
        onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
        placeholder="New Name"
      />
      <input
        type="email"
        value={updateData.email}
        onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
        placeholder="New Email"
      />
      <input
        type="number"
        value={updateData.age}
        onChange={(e) => setUpdateData({ ...updateData, age: e.target.value })}
        placeholder="New Age"
      />
        <input
        type="text"
        value={updateData.address}
        onChange={(e) => setUpdateData({ ...updateData, address: e.target.value })}
        placeholder="New Address"
      />
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
};

export default UserUpdate;
