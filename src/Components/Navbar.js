import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../imgs/servisologo.png";
import home from "../imgs/homeIcon.png";
import inv from "../imgs/inventoryIcon.png";
import mail from "../imgs/mailIcon.png";
import services from "../imgs/servisesIcon.jpeg";
import manager from "../imgs/managerIcon.png";
import Tasks from "../imgs/tasksIcon.png";

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo" onClick={handleClick}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={logo}
              alt=""
              style={{
                float: "left",
                width: "60%",
                height: "50%",
                border: "4px",
              }}
            />
          </div>
        </Link>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home &nbsp;
              <img src={home} alt="home btn" width="30" height="35" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Tasks" className="nav-links">
              Tasks &nbsp;
              <img src={Tasks} alt="home btn" width="30" height="35" />
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/Chats" className="nav-links">
              Chat &nbsp;
              <img src={mail} alt="home btn" width="36" height="35" />
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/chat/:id" className="nav-links">
              User Chat &nbsp;
              <img src={services} alt="home btn" width="36" height="35" />
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/Guest_manager" className="nav-links">
              Guest Manager
              <img src={manager} alt="home btn" width="39" height="35" />
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/Inventory" className="nav-links">
              Inventory &nbsp;
              <img src={inv} alt="home btn" width="30" height="35" />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
