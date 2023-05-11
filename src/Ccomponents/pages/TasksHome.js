import React, { useState } from "react";
import "../../App.css";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="tab-buttons">
          <button className={"btn1"}>Guests</button>
          <button
            className={"btn1"}
            data-toggle="tab"
            href="#RoomServices"
            id="RoomService"
          >
            Employees
          </button>
          <button
            className={"btn1"}
            data-toggle="tab"
            href="#RoomCleaning"
            id="RoomCleaning"
          >
            Bookings
          </button>
        </div>
      </div>
    </>
  );
}
