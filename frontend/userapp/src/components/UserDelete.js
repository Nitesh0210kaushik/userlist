import React from 'react';

const UserDelete = ({ userId, onDeleteUser }) => {
  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/formusers/${userId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        onDeleteUser();
      } else {
        console.error('Error deleting user:', data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDeleteUser}>
      Delete
    </button>
  );
};

export default UserDelete;
