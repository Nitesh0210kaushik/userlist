
import React, { useState, useEffect } from 'react';
import './Homepage.css';
import UserForm from './UserForm';
import UserList from './UserList';
import UserFilter from './UserFilter';
import UserSort from './UserSort'; 

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/formusers');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const response = await fetch('http://localhost:5000/formusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (response.ok) {
        fetchUsers();
      } else {
        console.error('Error creating user:', data.message);
        alert('Error: Email already taken');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async () => {
    fetchUsers();
  };

  const handleDeleteUser = async () => {
    fetchUsers();
  };

  const handleFilter = (e) => {
    setFilterTerm(e.target.value);
  };

  const handleSortByAge = () => {
    const sortedUsers = [...users].sort((a, b) => a.age - b.age);
    setUsers(sortedUsers);
  };

  const handleSortByName = () => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUsers);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1> User Form </h1>
      <UserForm onAddUser={handleAddUser} />
      <UserFilter filterTerm={filterTerm} onFilterChange={handleFilter} />
      <UserSort
        users={users}
        onSortByAge={handleSortByAge}
        onSortByName={handleSortByName}
      />
      <h2>User List</h2>
      <UserList
        users={filteredUsers}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default Homepage;

