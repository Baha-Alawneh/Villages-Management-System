import ChatHeader from "./chat-header";
import ChatWindow from "./chat-window";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../Components/Layout";
import './chat.css'
function Chat() {
  const [admins, setAdmins] = useState([]);
  const [currentAdmin, setCurrentAdmin] = useState();
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const search =useRef(null);

  const handleClick = (name) => {
    setCurrentAdmin("chat with: "+name);
  }
  const handleSearch = () => {
    if(search.current) {
    const searchTerm = search.current.value.toLowerCase();
    const filteredAdmins = admins.filter(admin => admin.username.toLowerCase().includes(searchTerm));
    setFilteredAdmins(filteredAdmins);
  }
}
  useEffect(() => {
    const info = [
      { username: "Admin 1" },
      { username: "Admin 2" },
      { username: "Admin 3" },
      { username: "Admin 4" }
    ]
    setAdmins(info)
    setFilteredAdmins(info)
  }
    , []);
  return (
    <Layout>
      <div className="container">
        <ChatHeader search={search} admins={filteredAdmins} handleClick={handleClick} handleSearch={handleSearch} />
        <ChatWindow currentAdmin={currentAdmin} />
      </div>
    </Layout>
  );
}

export default Chat;