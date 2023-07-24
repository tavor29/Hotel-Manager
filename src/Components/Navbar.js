import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { BsListOl, BsLayoutTextWindowReverse } from "react-icons/bs";
import { BiAlignLeft, BiCalendar, BiMessage, BiChat } from "react-icons/bi";

function Navbar() {
  return (
    <>
      <div className="navbarr">
        <Link to="/">
          <button className="buttonBar">
            <BiAlignLeft className="barIcons" />
            <h2 className="textBar">Dashboard</h2>
          </button>
        </Link>
        <Link to="/Schedule">
          <button className="buttonBar">
            <BiCalendar className="barIcons" />
            <h2 className="textBar">Schedule</h2>
          </button>
        </Link>
        <Link to="/Tasks">
          <button className="buttonBar">
            <BsLayoutTextWindowReverse className="barIcons" />
            <h2 className="textBar">Task list</h2>
          </button>
        </Link>
        <Link to="/Inventory">
          <button className="buttonBar">
            <BsListOl className="barIcons" />
            <h2 className="textBar">Inventory Mgr</h2>
          </button>
        </Link>
        <Link to="/Chats">
          <button className="buttonBar">
            <BiChat className="barIcons" />
            <h2 className="textBar">Chat</h2>
          </button>
        </Link>
      </div>
      {/* <nav className="navbar">
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
      </nav> */}
    </>
  );
}

export default Navbar;
