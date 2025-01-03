import ChatHeader from "./chat-header";
import ChatWindow from "./chat-window";
import React from "react";
import Layout from "../../Components/Layout";

function Chat() {
return (
  <Layout>
    <div className="container">
      <ChatHeader />
      <ChatWindow />
      </div>
  </Layout>
 );
}

export default Chat;