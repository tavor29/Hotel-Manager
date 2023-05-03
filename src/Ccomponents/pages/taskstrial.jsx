import React, { useState } from "react";
import "../../styles/TasksStyle.css";
import { useTable } from "react-table";
import TableData from "../JsonFiles/TableData.js";

export default function Tasks() {
  const [activeTab, setActiveTab] = useState(0);
  const [combinedData, setCombinedData] = useState(["newData"]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: TableData.tableColumns[activeTab],
      data:
        combinedData.length > 0 ? combinedData : TableData.tableData[activeTab],
    });

  function combineTables() {
    let newData = [];
    TableData.tableData.forEach((tableData) => {
      tableData.forEach((row) => {
        newData.push(row);
      });
    });
    setCombinedData(newData);
  }

  return (
    <>
      <span className="header">Task List</span>
      <div className="container">
        <div className="tab-buttons">
          <button
            className={combinedData.length > 0 ? "btn-active" : "btn1"}
            onClick={combineTables}
          >
            All Tasks
          </button>
          <button
            className={
              combinedData.length <= 0 && activeTab === 0
                ? "btn-active"
                : "btn1"
            }
            onClick={function () {
              setActiveTab(0);
              setCombinedData([]);
            }}
          >
            Room Cleaning
          </button>
          <button
            className={
              combinedData.length <= 0 && activeTab === 1
                ? "btn-active"
                : "btn1"
            }
            onClick={function () {
              setActiveTab(1);
              setCombinedData([]);
            }}
          >
            Kitchen
          </button>
          <button
            className={
              combinedData.length <= 0 && activeTab === 2
                ? "btn-active"
                : "btn1"
            }
            onClick={function () {
              setActiveTab(2);
              setCombinedData([]);
            }}
          >
            Bar
          </button>
        </div>
        <div className="tab-content">
          <table {...getTableProps()} style={{ border: "solid 1px black" }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        borderBottom: "solid 3px black",
                        background: "aliceblue",
                        padding: "10px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            padding: "10px",
                            border: "solid 1px gray",
                            background: "papayawhip",
                            textAlign: "center",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
