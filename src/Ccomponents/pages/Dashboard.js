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
} from "recharts";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(
        "https://proj.ruppin.ac.il/cgroup97/prod/api/GetAdminDashboard?hotelID=1002"
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

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const renderBarChart = (data, dataKey, color) => {
    return (
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} name="Count" fill={color} />
      </BarChart>
    );
  };

  const renderPieChart = (data, dataKey, color) => {
    return (
      <PieChart width={400} height={300}>
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

  const renderTable = () => {
    const tableData = [];

    // Helper function to add category label to the tableData array
    const addCategoryLabel = (category) => {
      tableData.push({
        category,
        name: "Category Label",
        count: "Category Label",
      });
    };

    // Helper function to add data for a specific category to the tableData array
    const addCategoryData = (category, categoryData) => {
      Object.entries(categoryData).forEach(([name, count]) => {
        tableData.push({
          category,
          name,
          count,
        });
      });
    };

    // Add category labels and data to the tableData array
    addCategoryLabel("Ordered Food");
    addCategoryData("Ordered Food", dashboardData.Data.Ordered_Food);

    addCategoryLabel("Ordered Drinks");
    addCategoryData("Ordered Drinks", dashboardData.Data.Ordered_Drinks);

    addCategoryLabel("Ordered Alcohol");
    addCategoryData("Ordered Alcohol", dashboardData.Data.Ordered_Alcohol);

    addCategoryLabel("Ordered Additional Items");
    addCategoryData(
      "Ordered Additional Items",
      dashboardData.Data.Ordered_AdditionalItems
    );

    addCategoryLabel("Custom Requests");
    addCategoryData("Custom Requests", dashboardData.Data.Custom_Requests);

    return (
      <div className="TableContainerWrapper">
        <div className="TableContainer">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Item Name</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((entry, index) => (
                <tr key={index} className="TableRow">
                  <td className="CategoryLabel">
                    {entry.name === "Category Label" && (
                      <strong>{entry.category}</strong>
                    )}
                  </td>
                  {entry.name !== "Category Label" && (
                    <>
                      <td>{entry.name}</td>
                      <td>{entry.count}</td>
                    </>
                  )}
                  {entry.name === "Category Label" && (
                    <>
                      <td></td>
                      <td>
                        <strong>{entry.sum}</strong>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container">
        {dashboardData ? (
          <>
            <div className="Dashboard">
              <h1 className="header1">Hotel Manager Dashboard</h1>

              {/* Date range selector  */}

              {/* <div className="DateRangeSelector">
                <h3>Start Date</h3>&nbsp;&nbsp;&nbsp;
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  placeholder="Start Date"
                />{" "}
                &nbsp;&nbsp;&nbsp;
                <h3>End Date</h3>&nbsp;&nbsp;&nbsp;
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  placeholder="End Date"
                />
              </div> */}

              <div className="ChartsContainer">
                {/* Bar Chart for Most Preferred Drinks */}
                <div className="Chart">
                  <h2>Most Preferred Drinks</h2>
                  {renderBarChart(
                    Object.entries(dashboardData.Data.Ordered_Drinks).map(
                      ([name, count]) => ({ name, Count: count })
                    ),
                    "Count",
                    "#d1bfa6"
                  )}
                </div>

                {/* New Bar Chart for Most Ordered Custom Requests */}
                <div className="Chart">
                  <h2>Most Ordered Custom Requests</h2>
                  {renderBarChart(
                    Object.entries(dashboardData.Data.Custom_Requests).map(
                      ([name, count]) => ({ name, Count: count })
                    ),
                    "Count",
                    "#b48c7a"
                  )}
                </div>
              </div>

              <div className="PieChartsContainer">
                {/* Pie Chart for Ordered Food */}
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

                {/* Pie Chart for Ordered Additional Items */}
                <div className="Chart">
                  <h2>Ordered Additional Items</h2>
                  {renderPieChart(
                    Object.entries(
                      dashboardData.Data.Ordered_AdditionalItems
                    ).map(([name, count]) => ({ name, count })),
                    "count",
                    "#d1bfa6"
                  )}
                </div>
              </div>
            </div>

            <div>
              {" "}
              <h2 className="table1">All Orders</h2>
              {renderTable()}
            </div>
          </>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </>
  );
}

export default Dashboard;
