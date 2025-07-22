import React from 'react';

function UserSelector({ users, selectedUser, onSelectUser }) {
  return (
    <div className="user-selector">
      <label htmlFor="user-select">Select User:</label>
      <select 
        id="user-select"
        value={selectedUser?._id || ''} 
        onChange={(e) => {
          const user = users.find(u => u._id === e.target.value);
          onSelectUser(user);
        }}
      >
        <option value="">-- Select a user --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name} ({user.points.toLocaleString()} points)
          </option>
        ))}
      </select>
    </div>
  );
}

export default UserSelector;