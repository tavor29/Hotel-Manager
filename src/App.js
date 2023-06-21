import React from "react";
import Navbar from "./Components/Navbar";
import TopNavbar from "./Components/TopNavbar";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SSEComponent from "./Listeners/SSEComponent";

// pages
import TasksHome from "./Ccomponents/pages/TasksHome";
import Services from "./Ccomponents/pages/Services";
import TabTasks from "./Ccomponents/pages/TabTasks";
import Guestmanager from "./Ccomponents/pages/Guest-manager";
import Inventory from "./Ccomponents/pages/Inventory";
import CreateTask from "./Ccomponents/pages/CreateTask";
import ChatMain from "./Chat/Components/MainChats";
import Chat from "./Chat/Components/UserChat";

function App() {
  return (
    <>
      {/* <Chat /> */}
      <TopNavbar />
      <Navbar />
      <Routes>
        <Route path="/" element={<TasksHome />} />
        <Route path="/services" element={<Services />} />
        <Route path="/Tasks" element={<TabTasks />} />
        <Route path="/Guest_manager" element={<Guestmanager />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Create_Task" element={<CreateTask />} />
        <Route path="/Chats" element={<ChatMain />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
      <SSEComponent />
    </>
  );
}

export default App;
