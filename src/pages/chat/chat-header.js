import React from 'react';

function chatHeader({ role,search, admins = [], handleClick, handleSearch }) {
  console.log("Admins Prop:", admins); 
  if (!admins.length) {
    return <div>Loading admins...</div>;  
  }

  const cleanedAdmins = admins.map(admin => ({
    user_id: admin.user_id,
    username: admin.username,
  }));

  return (
    <>
    
       <h1 className="chat-header">
        {role === 'admin' ? 'Chat with Users' : 'Chat with Admins'}
      </h1>
      <div className="search-bar">
        <input ref={search} onChange={handleSearch} type="text" id="search" placeholder="Search..." />
      </div>
      <div className="admin-list">
        <h1>
        {role === 'admin' ? 'Available Users' : 'Available Admins'}</h1>
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
