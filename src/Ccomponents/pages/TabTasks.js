import React from "react";
import "../../App.css";
import Tasks from "../../Components/Tasks";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
export default function TabTasks() {
  return (
    <div style={{ padding:50, marginTop:-50 }}>
      <Tabs>
        <div className="container">
          <TabList style={{display:"flex", justifyContent:"space-evenly"}}>
            <Tab>
              {" "}
              <button className={"btn1"}>Toiletries</button>
            </Tab>
            <Tab>
              {" "}
              <button className={"btn1"}>Room Service</button>
            </Tab>
            <Tab>
              {" "}
              <button className={"btn1"}>Room Cleaning</button>{" "}
            </Tab>
            <Tab>
              {" "}
              <button className={"btn1"}>Custom Requests</button>{" "}
            </Tab>
          </TabList>
        </div>
        <TabPanel>
          <div>
            <Tasks category={"Toiletries"} />
          </div>
        </TabPanel>

        <TabPanel>
          <Tasks category={"Room Service"} />
        </TabPanel>

        <TabPanel>
          <Tasks category={"Room Cleaning"} />
        </TabPanel>

        <TabPanel>
          <Tasks category={"CustomRequests"} />
        </TabPanel>
      </Tabs>
    </div>
  );
}
