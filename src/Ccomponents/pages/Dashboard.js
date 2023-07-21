import "../../styles/Dash+SchedStyle.css";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(
        "http://proj.ruppin.ac.il/cgroup97/test2/api/GetAdminDashboard?hotelID=1002"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderBarChart = (data, dataKey, color) => {
    return (
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill={color} />
      </BarChart>
    );
  };

  const renderPieChart = (data, dataKey, color) => {
    return (
      <PieChart width={500} height={300}>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={70}
          fill={color}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend iconSize={0.1} verticalAlign="bottom" height={120} />
      </PieChart>
    );
  };

  return (
    <>
      <div className="container">
        <h1 className="header1">Hotel Manager Dashboard</h1>
        <div className="Dashboard">
          {dashboardData ? (
            <>
              <div className="ChartsContainer">
                <div className="Chart">
                  <h2>Number of Room Service Orders</h2>
                  {renderBarChart(
                    [
                      {
                        name: "Room Service Orders",
                        SumOfRoomServiceOrders:
                          dashboardData.SumOfRoomServiceOrders,
                      },
                    ],
                    "SumOfRoomServiceOrders",
                    "#b48c7a"
                  )}
                </div>
                <div className="Chart">
                  <h2>Number of Household Requests</h2>
                  {renderBarChart(
                    [
                      {
                        name: "Household Requests",
                        SumOfHouseholdRequests:
                          dashboardData.SumOfHouseholdRequests,
                      },
                    ],
                    "SumOfHouseholdRequests",
                    "#d1bfa6"
                  )}
                </div>
                {/* Render additional charts as needed */}
              </div>
              <div className="PieChartsContainer">
                <div className="Chart">
                  <h2>Ordered Food</h2>
                  {renderPieChart(
                    Object.entries(dashboardData.Data.Ordered_Food).map(
                      ([name, count]) => ({ name, count })
                    ),
                    "count",
                    "#b48c7a"
                  )}
                </div>
                <div className="Chart">
                  <h2>Ordered Drinks</h2>
                  {renderPieChart(
                    Object.entries(dashboardData.Data.Ordered_Drinks).map(
                      ([name, count]) => ({ name, count })
                    ),
                    "count",
                    "#d1bfa6"
                  )}
                </div>
                {/* Render additional pie charts as needed */}
              </div>
            </>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
