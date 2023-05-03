import logo from "../imgs/servisologo.png";
import mail from "../imgs/mailIcon.png";
import inventory from "../imgs/inventoryIcon.png";
import services from "../imgs/servisesIcon.jpeg";
import tasks from "../imgs/tasksIcon.png";
import home from "../imgs/homeIcon.png";
import React from "react";
import '../styles/Nav.css'

function navbar() {
  return (
 
        <div className="navbar">
          <img src={logo} alt="icon1" />
          <img src={home} alt="icon2" />
          <img src={mail} alt="icon3" />
          <img src={tasks} alt="icon4" />
          <img src={services} alt="icon5" />
          <img src={inventory} alt="icon5" />
        </div>
    
  );
}

export default navbar;
