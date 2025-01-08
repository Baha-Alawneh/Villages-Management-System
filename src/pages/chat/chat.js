import ChatHeader from "./chat-header";
import ChatWindow from "./chat-window";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../Components/Layout";
import './chat.css';
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID, GET_ADMINS, GET_USERS } from "../../grqphql/auth.js";

function Chat() {
  const [userList, setUserList] = useState([]); // List of recipients (admins/users)
  const [filteredList, setFilteredList] = useState([]); // Filtered recipient list
  const [currentRecipient, setCurrentRecipient] = useState(null);
  const [wsStatus, setWsStatus] = useState('disconnected');
  const search = useRef(null);
  const messageInput = useRef(null);
  const [chatMessages, setChatMessages] = useState(''); // Chat history
  const [user, setUser] = useState(null);
  // Decode token to get user details
  const token = localStorage.getItem('authToken');
  const tokenParts = token.split('.');
  const decodedToken = JSON.parse(atob(tokenParts[1]));
  const userId = decodedToken.id;
  const role = decodedToken.role;

  // Queries
  const { data: userData } = useQuery(GET_USER_BY_ID, { variables: { id: userId } });
  const { data: adminsData } = useQuery(GET_ADMINS);
  const { data: usersData } = useQuery(GET_USERS);

  const ws = useRef(null);

  // Set user details
  useEffect(() => {
    if (userData) {
      setUser(userData.userById);
    }
  }, [userData]);

  useEffect(() => {
    if (role === 'user' && adminsData) {
      setUserList(adminsData.admins);
      setFilteredList(adminsData.admins);
    } else if (role === 'admin' && usersData) {
      setUserList(usersData.users);
      setFilteredList(usersData.users);
    }
  }, [adminsData, usersData, role]);

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket("ws://localhost:4000");

      ws.current.onopen = () => {
        let isCurrentAdmin ;
        console.log("WebSocket connection established");
        console.log(role);
        if(role === 'admin') {
          isCurrentAdmin=true;
        }
        else if (role === 'user') {
          console.log("in user ")
          isCurrentAdmin=false;
          console.log(isCurrentAdmin)
        }
        console.log(isCurrentAdmin+"is admin");
        ws.current.send(
          JSON.stringify({
            type: "authenticate",
            user_id: userId,
            isAdmin:isCurrentAdmin,
          })
        );
        setWsStatus('connected');
      };

      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "welcome") {
          console.log("Welcome: ", message.id);
        } else if (message.type === "direct-message") {
          setChatMessages((prev) => prev + message.from + ": " + message.content + "\r\n");
        }
      };

      ws.current.onclose = () => {
        setWsStatus('disconnected');
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setWsStatus('error');
      };
    }

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  // Send message
  const handleSend = () => {
    const message = messageInput.current.value;
    let isCurrentAdmin=role==='admin';

    if (message && currentRecipient) {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(
          JSON.stringify({
            type: "direct-message",
            from: user.username,
            to: currentRecipient,
            content: message,
            isAdmin: isCurrentAdmin,
          })
        );
        setChatMessages((prev) => prev + "you: " + message + "\r\n");  
        messageInput.current.value = "";
      }
    }
  };

  // Select recipient
  const handleClick = (username) => {
    setCurrentRecipient(username);
  };

  // Search recipients
  const handleSearch = () => {
    if (search.current) {
      const searchTerm = search.current.value.toLowerCase();
      const filtered = userList.filter((u) => u.username.toLowerCase().includes(searchTerm));
      setFilteredList(filtered);
    }
  };

  return (
    <Layout>
      <div className="container">
        <ChatHeader
          search={search}
          admins={filteredList} // Pass dynamic list (admins/users)
          handleClick={handleClick} // Handle recipient selection
          handleSearch={handleSearch} // Handle search input
        />
        <ChatWindow
          messages={chatMessages}
          message={messageInput}
          currentAdmin={currentRecipient} // Dynamic recipient
          send={handleSend} // Send message
        />
      </div>
    </Layout>
  );
}

export default Chat;
