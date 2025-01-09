import ChatHeader from "./chat-header";
import ChatWindow from "./chat-window";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../Components/Layout";
import './chat.css';
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_USER_BY_ID, GET_ADMINS, GET_USERS } from "../../grqphql/auth.js";
import { GET_CHAT } from "../../grqphql/chat.js";

function Chat() {
  const [userList, setUserList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [currentRecipient, setCurrentRecipient] = useState(null);
  const [wsStatus, setWsStatus] = useState('disconnected');
  const search = useRef(null);
  const messageInput = useRef(null);
  const [chatMessages, setChatMessages] = useState('');
  const [user, setUser] = useState(null);
  const [chatHistories, setChatHistories] = useState({});
  const token = localStorage.getItem('authToken');
  const tokenParts = token.split('.');
  const decodedToken = JSON.parse(atob(tokenParts[1]));
  const userId = decodedToken.id;
  const role = decodedToken.role;

  // Queries
  const { data: userData } = useQuery(GET_USER_BY_ID, { variables: { id: userId } });
  const { data: adminsData } = useQuery(GET_ADMINS);
  const { data: usersData } = useQuery(GET_USERS);
  const [fetchChat, { data: chatData }] = useLazyQuery(GET_CHAT);

  const ws = useRef(null);
  const currentRecipientRef = useRef(currentRecipient);

  useEffect(() => {
    currentRecipientRef.current = currentRecipient;
  }, [currentRecipient]);

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

  const HandleClick = (username) => {
    console.log("Selected recipient: ", username);
    setCurrentRecipient(username);

    // Check if chat history for the recipient is already cached
    if (chatHistories[username]) {
      setChatMessages(chatHistories[username]); // Load chat from cache
    } else {
      setChatMessages(''); // Clear chat while fetching new data
      // Fetch chat from the server if not cached
      const variables =
        role === 'admin'
          ? { user: username, admin: user.username }
          : { user: user.username, admin: username };
      fetchChat({ variables });
    }
  };

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket("ws://localhost:4000");

      ws.current.onopen = () => {
        console.log("WebSocket connection established");
        ws.current.send(
          JSON.stringify({
            type: "authenticate",
            user_id: userId,
            isAdmin: role === 'admin',
          })
        );
        setWsStatus('connected');
      };

      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "direct-message") {
          console.log("Direct Message: ", message);
          const { from, content } = message;

          // Update the chat history for the recipient
          setChatHistories((prevHistories) => {
            const updatedHistory = {
              ...prevHistories,
              [from]: (prevHistories[from] || '') + `\r\n${from}: ${content}`,
            };
            // Update messages if the recipient is currently selected
            if (currentRecipientRef.current === from) {
              setChatMessages(updatedHistory[from]);
            }
            return updatedHistory;
          });
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

  useEffect(() => {
    if (chatData && chatData.chat) {
      const formattedMessages = formatChatMessages(chatData.chat);
      setChatHistories((prevHistories) => ({
        ...prevHistories,
        [currentRecipient]: formattedMessages,
      }));
      setChatMessages(formattedMessages);
    }
  }, [chatData]);

  const handleSend = () => {
    const message = messageInput.current.value;
    if (message && currentRecipient) {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(
          JSON.stringify({
            type: "direct-message",
            from: user.username,
            to: currentRecipient,
            content: message,
            isAdmin: role === 'admin',
          })
        );

        setChatHistories((prevHistories) => {
          const updatedHistory = {
            ...prevHistories,
            [currentRecipient]:
              (prevHistories[currentRecipient] || '') +
              `\r\nyou: ${message}`,
          };
          setChatMessages(updatedHistory[currentRecipient]);
          return updatedHistory;
        });

        messageInput.current.value = "";
      }
    }
  };

  const formatChatMessages = (chat) => {
    const messages = chat.split(',');
    return messages
      .map((message) => {
        const [sender, content] = message.split(':');
        return sender === user.username
          ? `you: ${content}`
          : `${sender}: ${content}`;
      })
      .join("\r\n");
  };

  const handleSearch = () => {
    if (search.current) {
      const searchTerm = search.current.value.toLowerCase();
      setFilteredList(
        userList.filter((u) => u.username.toLowerCase().includes(searchTerm))
      );
    }
  };

  return (
    <Layout>
      <div className="container">
        <ChatHeader
          role={role}
          search={search}
          admins={filteredList}
          handleClick={HandleClick}
          handleSearch={handleSearch}
        />
        <ChatWindow
          messages={chatMessages}
          message={messageInput}
          currentAdmin={currentRecipient}
          send={handleSend}
        />
      </div>
    </Layout>
  );
}

export default Chat;
