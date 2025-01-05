import React from "react";


function chatWindow({currentAdmin}) {

return (
    <div className="chat-window">
    <h3 id="admin-name">{currentAdmin}</h3>
    <div className="chat-box">
        <p><strong>Admin1:</strong> <span>Hello! How can I assist you today?</span></p>
        <p><strong>You:</strong> <span>I have a question about my account.</span></p>
        <p><strong>Admin1:</strong> <span>Sure! Please provide your account details.</span></p>
    </div>

    <div className="message-input">
        <input type="text" placeholder="Type your message..." className="message" />
        <input type="button" value="send" className="send"/>
    </div>
</div>
);


}

export default chatWindow;