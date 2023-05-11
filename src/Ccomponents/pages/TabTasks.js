import React from "react";
import "../../App.css";
import Tasks from "../../Components/Tasks";


import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
export default function TabTasks(){ 


return (
  <div >
    <Tabs>
    <div className="container">
      <TabList>
        <Tab> <button className={"btn1"} >Toiletries</button></Tab>
        <Tab> <button className={"btn1"} >Room Service</button></Tab>
        <Tab> <button className={"btn1"} >Room Cleaning</button> </Tab>
      </TabList>
    </div>
      <TabPanel>
       <div>
        <Tasks category={"Toiletries"}/>
       </div>
      </TabPanel>

      <TabPanel>
      <Tasks category={"RoomService"}/>
      </TabPanel>

      <TabPanel>
      <Tasks category={"RoomCleaning"}/>
      </TabPanel>
    </Tabs>
  </div>
);
}