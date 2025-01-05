import React from 'react';


function chatHeader({search,admins,handleClick,handleSearch}) {
    

    return (
        <>
        <h1 className="chat-header">Chat with Admins</h1>
        <div className="search-bar">
          <input ref={search} onChange={handleSearch}type="text" id="search" placeholder="Search for an admin..." />
        </div>
        <div className="admin-list">
          <h1>Available Admins</h1>
          {admins.map((admin, index) => ( 
            <div className="admin-item" key={index} >
              <div className='admin-icon' onClick={()=>handleClick(admin.username)}></div>
              <span>{admin.username}</span>
            </div>
          ))}
        </div>
      </>
    );
}

export default chatHeader;