import React from 'react';
import "./chat.css"


function chatHeader () {
    return (
        <>
        <h1 className="chat-header">Chat with Admins</h1>
        <div className="search-bar">
            <input type="text" id="search" placeholder="Search for an admin..." />
        </div>
        <div className="admin-list">
            <h1>Available Admins</h1>
        </div>
        </>
    );
}

export default chatHeader;