import React from "react";
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

function App() {
  return (
    <>
      {/* <Chat /> */}
      <TopNavbar />
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
      {/* <SSEComponent /> */}
    </>
  );
}

export default App;
