import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./pages/overview/overview";
import VillageManagement from "./pages/VillageManagement/villageManagement";
import Chat from "./pages/chat/chat.js";
import Dashboard from './pages/dashboard/dashboard.js';
import { ApolloProvider } from '@apollo/client';
import client from './lib/apolloClient';

function App() {


  return (
    <ApolloProvider client={client}>
    <Router>
      <Dashboard />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/village-management" element={<VillageManagement />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
    </ApolloProvider>

  );
}

export default App;
