
import React, { useState } from "react";
import "../../App.css";
import Tasks from "./Tasks";

export default function Home() {
  const [category, setCategory] = useState("");

  const handleCategoryClick = (event) => {
    setCategory(event.id);
    console.log(event.target.id);
  };




  return (
    <>
      <div className="container">
        <div className="tab-buttons">
          <button className={"btn1"} data-toggle="tab" href="#Toiletries" id="Toiletries" onClick={handleCategoryClick}>Toiletries</button>
          <button className={"btn1"} data-toggle="tab" href="#RoomServices" id="RoomService" onClick={handleCategoryClick}>Room Service</button>
          <button className={"btn1"} data-toggle="tab" href="#RoomCleaning" id="RoomCleaning" onClick={handleCategoryClick}>Room Cleaning</button>
        </div>

     
        <div>
          <div id="Toilet ries" className="tab-pane fade in active">
            <h3>Toiletries</h3>
            <Tasks category={category}/>
          </div>
          <div id="RoomCleaning" className="tab-pane fade">
            <h3>Room Cleaning</h3>
            <Tasks category={category}/>
          </div>
          <div id="RoomServices" className="tab-pane fade">
            <h3>Room Services</h3>
            <Tasks category={category}/>
          </div>
         
        </div>
      </div>
    </>
  );
}
