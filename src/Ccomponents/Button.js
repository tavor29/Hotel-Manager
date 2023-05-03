import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

export function Button() {
  return (
    <Link to="/Create_Task">
      <button className="btn">Create Task</button>
    </Link>
  );
}
