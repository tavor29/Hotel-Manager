import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import TopNavbar from "./Components/TopNavbar";
import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
  const [username, setUsername] = useState(""); // Add username state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by looking for the token in local storage
    const userLoggedIn = localStorage.getItem("token");
    setIsLoggedIn(Boolean(userLoggedIn));
  }, []);

  // Basic login function for demonstration purposes
  const handleLogin = (username, password) => {
    if (username === "123" && password === "123") {
      localStorage.setItem("token", "abc123");

      setUsername(username);
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setIsLoggedIn(false);
    }
  };

  // Basic logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(""); // Reset the username state
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <TopNavbar name={username} handleLogout={handleLogout} />
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Tasks" element={<TabTasks />} />
            <Route path="/Guest_manager" element={<Guestmanager />} />
            <Route path="/Inventory" element={<Inventory />} />
            <Route path="/Schedule" element={<Schedule />} />
            <Route path="/Chats" element={<ChatMain />} />
            <Route path="/chat/:id" element={<Chat />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
            <Route path="/ForgotPass" element={<ForgotPass />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/PassReset" element={<PassReset />} />
            <Route path="/Validator" element={<Validator />} />
          </Routes>
        </>
      )}

      {/* <SSEComponent /> */}
    </>
  );
}

export default App;
