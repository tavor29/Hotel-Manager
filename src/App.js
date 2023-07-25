import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import TopNavbar from "./Components/TopNavbar";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

// pages
import Dashboard from "./Ccomponents/pages/Dashboard";
import TabTasks from "./Ccomponents/pages/TabTasks";
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

//firebase
import { auth } from "./firebase-config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // Add username state
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn) {
      setIsLoggedIn(true);
      setUsername(userLoggedIn); // Retrieve the username from localStorage
    }
  }, []);

  // Basic login function for demonstration purposes
  const handleLogin = async (username) => {
    // Save the login status to localStorage
    localStorage.setItem("isLoggedIn", username);
    setUsername(username); // Store the entered username in the state
    setIsLoggedIn(true);
    navigate("/"); // Redirect the user to the Dashboard after successful login
  };

  // Basic logout function
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("auth-token");
    setUsername(""); // Reset the username state
    setIsLoggedIn(false);
    navigate("/"); // Redirect the user to the login page after logout
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
            <Route path="/Inventory" element={<Inventory />} />
            <Route path="/Schedule" element={<Schedule />} />
            <Route path="/Chats" element={<ChatMain />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path={"*"} element={<Dashboard />} />

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
            <Route path={"*"} element={<LoginPage handleLogin={handleLogin} />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
