import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./pages/overview/overview";
import VillageManagement from "./pages/VillageManagement/villageManagement";
import Chat from "./pages/chat/chat.js";
import Dashboard from './pages/dashboard/dashboard.js';
import Gallery from './pages/gallary/gallary.js';
import { ApolloProvider } from '@apollo/client';
import client from './lib/apolloClient';
import SignUp from './pages/signup/signup.js';
import Login from './pages/login/login.js';
import PrivateRoute from './Components/PrivateRoute.js';
function App() {

  return (
    <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
            path="/"
            element={
              <PrivateRoute>
                <Overview />
              </PrivateRoute>
            }
          />
          <Route
            path="/village-management"
            element={
              <PrivateRoute>
                <VillageManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/gallery"
            element={
              <PrivateRoute>
                <Gallery />
              </PrivateRoute>
            }
          />
          </Routes>
    </Router>
    </ApolloProvider>
 
  );
}

export default App;
