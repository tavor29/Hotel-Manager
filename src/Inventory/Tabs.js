import React, { useState, useEffect } from "react";
import "../App.css";
import Main from "./Components/Main";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function TabTasks() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJSON = async () => {
    try {
      const response = await fetch(
        "http://proj.ruppin.ac.il/cgroup97/test2/api/GetHotelServices?hotelID=1002"
      );
      if (response.status === 200) {
        setData(await response.json());
      } else {
        setData([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching JSON data:", error);
      setData([]);
      setLoading(false);
    }
  };

  const saveObjectLists = (data) => {
    const hotelActivities = data.hotel_activities;
    const hotelFacilities = data.hotel_facilities;
    const spaTherapies = data.spa_therapies;
    const foodMenu = data.food_menu;
    const drinksMenu = data.drinks_menu;
    const alcoholMenu = data.alcohol_menu;
    const additionalItemsMenu = data.additionalItems_menu;

    return {
      hotelActivities,
      hotelFacilities,
      spaTherapies,
      foodMenu,
      drinksMenu,
      alcoholMenu,
      additionalItemsMenu,
    };
  };

  useEffect(() => {
    fetchJSON();
  }, []);

  if (loading) {
    return (
      <div style={{ marginLeft: "40px" }}>
        <h2 style={{ fontSize: "40px" }}>Loading...</h2>
      </div>
    );
  } else if (data.length === 0) {
    return (
      <div style={{ marginLeft: "40px" }}>
        <h2 style={{ fontSize: "40px" }}>Connection to Server Failed</h2>
      </div>
    );
  } else {
    const {
      hotelActivities,
      hotelFacilities,
      spaTherapies,
      foodMenu,
      drinksMenu,
      alcoholMenu,
      additionalItemsMenu,
    } = saveObjectLists(data);

    return (
      <div>
        <Tabs>
          <div className="tabs">
            <TabList>
              <Tab>
                {" "}
                <button className={"btn1"}>Hotel Activities</button>
              </Tab>
              <Tab>
                {" "}
                <button className={"btn1"}>Hotel Facilities</button>
              </Tab>
              <Tab>
                {" "}
                <button className={"btn1"}>Spa Treatments</button>{" "}
              </Tab>
              <Tab>
                {" "}
                <button className={"btn1"}>Food Menu</button>{" "}
              </Tab>
              <Tab>
                {" "}
                <button className={"btn1"}>Drinks Menu</button>{" "}
              </Tab>
              <Tab>
                {" "}
                <button className={"btn1"}>Alcohol Menu</button>{" "}
              </Tab>
              <Tab>
                {" "}
                <button className={"btn1"}>Additional Items Menu</button>{" "}
              </Tab>
            </TabList>
          </div>
          {/* {console.log("tabs: " + hotelActivities)} */}
          <TabPanel>
            <Main tab={hotelActivities} category={"hotelActivities"} />
          </TabPanel>

          <TabPanel>
            <Main tab={hotelFacilities} category={"hotelFacilities"} />
          </TabPanel>

          <TabPanel>
            <Main tab={spaTherapies} category={"spaTherapies"} />
          </TabPanel>

          <TabPanel>
            <Main tab={foodMenu} category={"foodMenu"} />
          </TabPanel>

          <TabPanel>
            <Main tab={drinksMenu} category={"drinksMenu"} />
          </TabPanel>

          <TabPanel>
            <Main tab={alcoholMenu} category={"alcoholMenu"} />
          </TabPanel>

          <TabPanel>
            <Main tab={additionalItemsMenu} category={"additionalItemsMenu"} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
