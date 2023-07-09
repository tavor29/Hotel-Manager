import React from "react";
import "../App.css";
// import Main from "./Components/Main-Test";

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
          <div>{/* <Main  /> */}</div>
        </TabPanel>

        <TabPanel>{/* <Main tab={"Spa"} /> */}</TabPanel>

        <TabPanel>{/* <Main tab={"Facilities"} /> */}</TabPanel>

        <TabPanel>{/* <HR tabs/> */}</TabPanel>
      </Tabs>
    </div>
  );
}
