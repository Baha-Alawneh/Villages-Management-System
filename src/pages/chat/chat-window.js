import React from "react";

function ChatWindow({ messages = '', message, currentAdmin, send }) {
    const messageList = messages
      .split("\r\n")
      .filter((msg) => msg.trim() !== '') 
      .map((msg, index) => (
        <div key={index}>
          {msg}<br />
        </div>
      ));
  
    return (
      <div className="chat-window">
        <h3 id="admin-name">{currentAdmin || 'Select a recipient'}</h3>
        <div className="chat-box">
          {messageList}
        </div>
        <div className="message-input">
          <input ref={message} type="text" placeholder="Type your message..." className="message" />
          <input onClick={send} type="button" value="send" className="send" />
        </div>
      </div>
    );
  }
  

export default ChatWindow;
