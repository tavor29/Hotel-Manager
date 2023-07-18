import React from "react";
import logo1 from "../imgs/logo1.png";
import { Link } from "react-router-dom";

export default function TopNavbar({ name, handleLogout }) {
  return (
    <div className="AppHeader">
      <Link to="/">
        <img width={90} src={logo1} alt="" />
      </Link>
      <h1
        style={{
          textAlign: "left",
          position: "absolute",
          left: 150,
          fontFamily: "Arial",
        }}
      >
        SERVISO
      </h1>
      <p>Hello {name}!</p>
      <button
        style={{
          position: "absolute",
          right: 20,
          top: 15,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
}
