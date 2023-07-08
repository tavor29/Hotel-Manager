import React from "react";
import "../App.css";
// import Tasks from "../../Components/Tasks";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
export default function TabTasks() {
  return (
    <div>
      <Tabs>
        <div className="tabs">
          <TabList>
            <Tab>
              {" "}
              <button className={"btn1"}>Menu</button>
            </Tab>
            <Tab>
              {" "}
              <button className={"btn1"}>Spa</button>
            </Tab>
            <Tab>
              {" "}
              <button className={"btn1"}>Facilities</button>{" "}
            </Tab>
            <Tab>
              {" "}
              <button className={"btn1"}>HR</button>{" "}
            </Tab>
          </TabList>
        </div>
        <TabPanel>
          <div>{/* <Tasks category={"Toiletries"} /> */}</div>
        </TabPanel>

        <TabPanel>{/* <Tasks category={"Room Service"} /> */}</TabPanel>

        <TabPanel>{/* <Tasks category={"Room Cleaning"} /> */}</TabPanel>

        <TabPanel>{/* <Tasks category={"CustomRequests"} /> */}</TabPanel>
      </Tabs>
    </div>
  );
}
