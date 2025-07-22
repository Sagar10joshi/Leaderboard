import React, { useState } from 'react';

function AddUser({ onAddUser }) {
  const [userName, setUserName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim()) return;

    setIsAdding(true);
    const success = await onAddUser(userName.trim());
    if (success) {
      setUserName('');
    }
    setIsAdding(false);
  };

  return (
    <div className="add-user">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter new user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={isAdding}
        />
        <button type="submit" disabled={!userName.trim() || isAdding}>
          {isAdding ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  );
}

export default AddUser;