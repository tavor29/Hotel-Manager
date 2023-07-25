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
        "https://proj.ruppin.ac.il/cgroup97/prod/api/GetHotelServices?hotelID=1002"
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
            <TabList style={{display:"flex", justifyContent:"space-evenly"}}>
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
            <Main tab={hotelActivities} category={"hotelActivities"} fetchJSON={fetchJSON}/>
          </TabPanel>

          <TabPanel>
            <Main tab={hotelFacilities} category={"hotelFacilities"} fetchJSON={fetchJSON}/>
          </TabPanel>

          <TabPanel>
            <Main tab={spaTherapies} category={"spaTherapies"} fetchJSON={fetchJSON}/>
          </TabPanel>

          <TabPanel>
            <Main tab={foodMenu} category={"foodMenu"} fetchJSON={fetchJSON}/>
          </TabPanel>

          <TabPanel>
            <Main tab={drinksMenu} category={"drinksMenu"} fetchJSON={fetchJSON}/>
          </TabPanel>

          <TabPanel>
            <Main tab={alcoholMenu} category={"alcoholMenu"} fetchJSON={fetchJSON}/>
          </TabPanel>

          <TabPanel>
            <Main tab={additionalItemsMenu} category={"additionalItemsMenu"} fetchJSON={fetchJSON}/>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
