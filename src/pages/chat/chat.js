import ChatHeader from "./chat-header";
import ChatWindow from "./chat-window";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../Components/Layout";
import './chat.css'
function Chat() {
  const [admins, setAdmins] = useState([]);
  const [currentAdmin, setCurrentAdmin] = useState();
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [wsStatus, setWsStatus] = useState('disconnected');
  const search = useRef(null);
  const messageInput = useRef(null);
  const [chatMessages, setChatMessages] = useState('');

  const ws = useRef(null);

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket("ws://localhost:3001");
      
      ws.current.onopen = () => {
        console.log("WebSocket connection established");
        setWsStatus('connected'); 
      };

      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "direct-message") {
          console.log("Message from admin:", message.content);
          setChatMessages(prevMessages => prevMessages + currentAdmin + ": " + message.content + "\r\n");

        }
        if(message.type === "welcome") {
           console.log("Welcome: ",message.clientId);
        }
      };

      ws.current.onclose = () => {
        console.log("WebSocket connection closed");
        setWsStatus('disconnected'); 
      };
    }

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        console.log("Closing WebSocket connection");
        ws.current.close();
      }
    };
  }, []);

  const handleSend = () => {
    const message = messageInput.current.value;
    if (message && currentAdmin) {
      console.log("Sending message to:", currentAdmin);
      console.log("Message:", message);

      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(
          JSON.stringify({
            type: "direct-message",
            from: "User 1",
            to: currentAdmin,
            content: message,
          })
        );
        setChatMessages(prevMessages => prevMessages + "you: " + message + "\r\n");  
        messageInput.current.value = "";  

      } else {
        console.log("WebSocket is not open. Message not sent.");
      }
    }
  };

  const handleClick = (name) => {
    setCurrentAdmin(name);
  };

  const handleSearch = () => {
    if (search.current) {
      const searchTerm = search.current.value.toLowerCase();
      const filteredAdmins = admins.filter(admin =>
        admin.username.toLowerCase().includes(searchTerm)
      );
      setFilteredAdmins(filteredAdmins);
    }
  };

  useEffect(() => {
    const info = [
      { username: "Admin 1" },
      { username: "Admin 2" },
      { username: "Admin 3" },
      { username: "Admin 4" }
    ];
    setAdmins(info);
    setFilteredAdmins(info);
  }, []);

  return (
    <Layout>
      <div className="container">
        <ChatHeader
          search={search}
          admins={filteredAdmins}
          handleClick={handleClick}
          handleSearch={handleSearch}
        />
        <ChatWindow
          messages={chatMessages}
          message={messageInput}
          currentAdmin={currentAdmin}
          send={handleSend}
        />
      </div>
    </Layout>
  );
}

export default Chat; 
