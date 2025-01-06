import React from "react";


function chatWindow({ messages, message, currentAdmin, send }) {
    const messageList = messages.split("\r\n").map((msg, index) => (
        <p key={index}>{msg}</p> 
      ));
    return (
        <div className="chat-window">
            <h3 id="admin-name">{currentAdmin}</h3>
            <div className="chat-box" >
                {messageList}
            </div>

            <div className="message-input">
                <input ref={message} type="text" placeholder="Type your message..." className="message" />
                <input onClick={send} type="button" value="send" className="send" />
            </div>
        </div>
    );


}

export default chatWindow;