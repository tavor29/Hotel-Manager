import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import TopNavbar from "./Components/TopNavbar";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SSEComponent from "./Listeners/SSEComponent";

// pages
import Dashboard from "./Ccomponents/pages/Dashboard";
import TabTasks from "./Ccomponents/pages/TabTasks";
import Guestmanager from "./Ccomponents/pages/Guest-manager";
import Inventory from "./Inventory/InventoryMgr";
import Schedule from "./Ccomponents/pages/Schedule";
import ChatMain from "./Chat/Components/MainChats";
import Chat from "./Chat/Components/UserChat";
//login
import LoginPage from "./Login/LoginPage";
import ForgotPass from "./Login/ForgotPass";
import PassReset from "./Login/PassReset";
import Register from "./Login/Register";
import Validator from "./Login/Validator";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by looking for the token in local storage
    const userLoggedIn = localStorage.getItem("token");
    setIsLoggedIn(Boolean(userLoggedIn));
  }, []);

  // Basic login function for demonstration purposes
  const handleLogin = (username, password) => {
    // In a real application, you would make an API call to authenticate the user and get the token
    // For now, we'll just set a dummy token "abc123" if the username and password match.
    if (username === "asdd" && password === "asd") {
      localStorage.setItem("token", "abc123");
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  // Basic logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Routes>
        {isLoggedIn ? (
          <>
            <TopNavbar />
            <Navbar />

            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Tasks" element={<TabTasks />} />
            <Route path="/Guest_manager" element={<Guestmanager />} />
            <Route path="/Inventory" element={<Inventory />} />
            <Route path="/Schedule" element={<Schedule />} />
            <Route path="/Chats" element={<ChatMain />} />
            <Route path="/chat/:id" element={<Chat />} />
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
            <Route path="/ForgotPass" element={<ForgotPass />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/PassReset" element={<PassReset />} />
            <Route path="/Validator" element={<Validator />} />
          </>
        )}
      </Routes>
      <SSEComponent />
    </>
  );
}

export default App;
