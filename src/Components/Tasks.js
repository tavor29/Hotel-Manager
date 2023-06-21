import React, { useEffect, useState } from "react";
import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import "../styles/TasksStyle.css";
import HouseHoldTaskRow from "./HouseHoldTaskRow";
import Form from "./AddTaskForm";
import Data from "../data/TaskData";
let cat = "";

const fetchTable = async () => {
  const res = await fetch(
    "http://proj.ruppin.ac.il/cgroup97/test2/api/GetHouseHoldCustomRequests?hotelID=1002"
  );

  let names = Data[cat].map((item) => item.name);
  let Allnames = [];
  Object.keys(Data).forEach(function (key) {
    Data[key].forEach((item) => Allnames.push(item.name));
  });

  let arr = await res.json();
  let filteredArr = arr.filter((obj) => names.includes(obj.name)); // filters the data sent through to the table

  if (cat === "CustomRequests") {
    filteredArr = arr.filter((obj) => !Allnames.includes(obj.name));
  } else if (filteredArr.length === 0) {
    filteredArr = [];
  }

  return filteredArr;
};

const queryClient = new QueryClient();

function TableComponent() {
  const queryClient2 = useQueryClient();
  const { data, isLoading, isError, isFetching } = useQuery(
    "tableData",
    fetchTable,

    { refetchInterval: 60000 }
  );

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const [newRow, setNewRow] = useState({});

  const [tasks, setTasks] = useState([]);

  const [dataList, setDataList] = useState([]);

  const setIsMarked = (id, typeID) => {
    deleteRow.mutate({ id, typeID });
  };

  const deleteRow = useMutation(
    async ({ id, typeID }) => {
      await fetch(
        `http://proj.ruppin.ac.il/cgroup97/test2/api/MarkCustomRequest?requestID=${id}&typeID=${typeID}`,
        {
          method: "PUT",
        }
      );
      console.log("fetching");
    },
    {
      onSuccess: () => {
        queryClient2.invalidateQueries("tableData");
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const addRow = useMutation(
    async () => {
      const postObject = GetRequestObject();
      const response = await fetch(
        `http://proj.ruppin.ac.il/cgroup97/test2/api/AdminCreateHouseHoldRequest?roomNum=${newRow.roomNumber}&hotelID=1002`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postObject),
        }
      );
      console.log("Posting...");
      console.log("postObject: " + JSON.stringify(postObject));
      console.log(response);

      return response;
    },
    {
      onSuccess: async (res) => {
        queryClient2.invalidateQueries("tableData");
        if (res.ok) {
          newRow.clearRow();
        } else {
          const data = await res.json();
          if (data.type && data.type == "NonActiveRoom") {
            if (data.message) {
              alert(data.message);
            }
          }
        }
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.entries(newRow).length != 0) {
      if (newRow.customName === "" && CheckIfCustom()) {
        alert("Custom item must have a name");
      } else if (newRow.typeID === "") {
        alert("Please make sure to select an item");
      } else if (newRow.amount != "" && newRow.roomNumber != "") {
        addRow.mutate();
      }
    } else {
      alert("Please fill the details for the new request");
    }
  };

  if (isLoading) {
    return <span className="header">Loading Requests</span>;
  }

  if (isError) {
    console.log("error fetch");
    return <span className="header">Error Loading Requests</span>;
  }

  const GetRequestObject = () => {
    //creating the parent
    let retVal = {};
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}/${month}/${day}`;
    const requestDate = formattedDate;
    const requestHour = date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    const status = "open";

    retVal["requestDate"] = requestDate;
    retVal["requestHour"] = requestHour;
    retVal["status"] = status;

    //creating the children
    const houseHold_Request = {};

    const requestInOrder = [];

    if (newRow.requestedDate || newRow.requestedHour) {
      const requestedDate = convertDateToRequiredFormat(newRow.requestedDate);
      const requestedHour = newRow.requestedHour;

      requestInOrder[0] = {
        requestedDate,
        requestedHour,
      };

      retVal["Request_In_Order"] = requestInOrder;
    }

    //creating the grand children

    const isCustomType = CheckIfCustom();
    let addedCustomRequest;
    if (isCustomType) {
      addedCustomRequest = {
        typeID: newRow.typeID,
        amount: newRow.amount,
        description: newRow.customName,
      };
    } else {
      addedCustomRequest = { typeID: newRow.typeID, amount: newRow.amount };
    }

    const houseHold_Custom_Request = [addedCustomRequest];

    // setting the grand child to his parent
    houseHold_Request["HouseHold_Custom_Request"] = houseHold_Custom_Request;

    //setting the childredn to the parent
    retVal["HouseHold_Request"] = houseHold_Request;

    return retVal;
  };

  const convertDateToRequiredFormat = (date) => {
    const parts = date.split("/");
    const day = parts[0];
    const month = String(Number(parts[1])).padStart(2, "0");
    const year = parts[2];
    const formattedDate = `${year}/${month}/${day}`;

    return formattedDate;
  };

  const CheckIfCustom = () => {
    const customTypeName = dataList?.find(
      (obj) => obj.typeID == newRow.typeID
    )?.name;

    return customTypeName && customTypeName === "CUSTOM";
  };

  return (
    <>
      <span className="header">Task List</span>
      {tasks && tasks.length > 0 ? (
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              borderBottom: "1px solid black",
              padding: "9px 0",
            }}
          >
            <div style={{ flex: "1", textAlign: "center" }}>Request id</div>
            <div style={{ flex: "1", textAlign: "center" }}>Amount</div>
            <div style={{ flex: "1", textAlign: "center" }}>Name</div>
            <div style={{ flex: "1", textAlign: "center" }}>Request Date</div>
            <div style={{ flex: "1", textAlign: "center" }}>Request Time</div>
            <div style={{ flex: "1", textAlign: "center", color: "red" }}>
              Requested Date{" "}
            </div>
            <div style={{ flex: "1", textAlign: "center", color: "red" }}>
              {" "}
              Requested Time
            </div>
            <div style={{ flex: "1", textAlign: "center" }}>Room Number</div>
            <div style={{ flex: "1", textAlign: "center" }}>Complete</div>
          </div>
          {tasks.map(
            (item, index) =>
              !item.isMarked && (
                <HouseHoldTaskRow
                  item={item}
                  key={index}
                  setIsMarked={setIsMarked}
                  dataList={cat}
                />
              )
          )}{" "}
          {isFetching && <p>Refreshing...</p>}
          <Form //create task form
            addRow={addRow}
            setNewRow={setNewRow}
            handleSubmit={handleSubmit}
            newRow={newRow}
            dataList={cat}
            setDataList={setDataList}
          />
        </div>
      ) : (
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 50,
              marginBottom: 50,
            }}
          >
            No tasks available
          </div>
        </div>
      )}
    </>
  );
}

export default function Tasks(props) {
  cat = props.category;
  return (
    <QueryClientProvider client={queryClient}>
      <TableComponent />
    </QueryClientProvider>
  );
}
