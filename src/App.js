import React from "react";
import Navbar from "./Components/Navbar";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SSEComponent from "./Listeners/SSEComponent";

// pages
import TasksHome from "./Ccomponents/pages/TasksHome";
import Services from "./Ccomponents/pages/Services";
import TabTasks from "./Ccomponents/pages/TabTasks";
import Guestmanager from "./Ccomponents/pages/Guest-manager";
import Inventory from "./Ccomponents/pages/Inventory";
import MainChat from "./Chat/Components/MainChats";
import UserChat from "./Chat/Components/UserChat";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TasksHome />} />
        <Route path="/services" element={<Services />} />
        <Route path="/Tasks" element={<TabTasks />} />
        <Route path="/Guest_manager" element={<Guestmanager />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Chats" element={<MainChat />} />
        <Route path="/UserChat" element={<UserChat />} />
      </Routes>
      <SSEComponent />
    </>
  );
}

export default App;
