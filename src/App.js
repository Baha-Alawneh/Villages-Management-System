import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Overview from "./pages/overview/overview";
import VillageManagement from "./pages/VillageManagement/villageManagement";
import Chat from "./pages/chat/chat.js";



function App() {
  const stats = {
    villageCount: 8, 
    urbanCount: 3,
    populationSize: 660000,
    landArea: 11.88
  };

  return (

    <Router>
      <Dashboard />
      <Routes>
        <Route path="/" element={<Overview stats={stats} />} />
        <Route path="/village-management" element={<VillageManagement />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>











    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
