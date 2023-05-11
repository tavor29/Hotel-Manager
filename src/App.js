import React from "react";
import Navbar from "./Components/Navbar";
import "./App.css";
import { Routes, Route } from "react-router-dom";

// pages
import TasksHome from "./Ccomponents/pages/TasksHome";
import Services from "./Ccomponents/pages/Services";
import Tasks from "./Ccomponents/pages/TabTasks";
import Guestmanager from "./Ccomponents/pages/Guest-manager";
import Chat from "./Ccomponents/pages/Chat";
import Inventory from "./Ccomponents/pages/Inventory"; //Create_Task
import CreateTask from "./Ccomponents/pages/CreateTask";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TasksHome />} />
        <Route path="/services" element={<Services />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/Guest_manager" element={<Guestmanager />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Create_Task" element={<CreateTask />} />
      </Routes>
    </>
  );
}

export default App;
