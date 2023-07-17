import React, { useState } from 'react';
import UserUpdate from './UserUpdate';
import UserDelete from './UserDelete';

const UserList = ({ users, onUpdateUser, onDeleteUser }) => {
  const [userToUpdate, setUserToUpdate] = useState(null);

  const handleSetUserToUpdate = (user) => {
    setUserToUpdate(user);
  };

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user._id}>
          <span>{user.name}</span>
          <span>{user.email}</span>
          <span>{user.age}</span>
          <span>{user.address}</span>

          {userToUpdate && userToUpdate._id === user._id ? (
            <UserUpdate
              user={userToUpdate}
              onUpdateUser={() => {
                setUserToUpdate(null);
                onUpdateUser(); 
              }}
            />
          ) : (
            <>
              <button className="btn btn-primary" onClick={() => handleSetUserToUpdate(user)}>
                Update Data
              </button>
              <UserDelete userId={user._id} onDeleteUser={onDeleteUser} />
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
