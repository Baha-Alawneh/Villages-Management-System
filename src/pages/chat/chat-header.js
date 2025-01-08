import React from 'react';

function chatHeader({ search, admins = [], handleClick, handleSearch }) {
  console.log("Admins Prop:", admins);  // Log the data to check if it's being passed correctly
  if (!admins.length) {
    return <div>Loading admins...</div>;  // Add a loading message or spinner here
  }

  // Optionally clean the data to remove unnecessary fields
  const cleanedAdmins = admins.map(admin => ({
    user_id: admin.user_id,
    username: admin.username,
  }));

  return (
    <>
      <h1 className="chat-header">Chat with Admins</h1>
      <div className="search-bar">
        <input ref={search} onChange={handleSearch} type="text" id="search" placeholder="Search for an admin..." />
      </div>
      <div className="admin-list">
        <h1>Available Admins</h1>
        {cleanedAdmins.map((admin, index) => (
          <div className="admin-item" key={index}>
            <div className='admin-icon' onClick={() => handleClick(admin.username)}></div>
            <span>{admin.username}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default chatHeader;
