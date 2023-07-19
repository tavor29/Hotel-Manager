import React, { useEffect, useState } from "react";
import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { Input } from "react-chat-elements";
import "../styles/TasksStyle.css";
import HouseHoldTaskRow from "./HouseHoldTaskRow";
import Form from "./AddTaskForm";
import Data from "../data/TaskData";
import RoomServiceTaskRow from "./RoomServiceTaskRow";
let cat = "";

const fetchTable = async () => {
  let url = "";

  if (cat === "Room Service") {
    url =
      "http://proj.ruppin.ac.il/cgroup97/test2/api/GetRoomServiceRequest?hotelID=1002";
  } else
    url =
      "http://proj.ruppin.ac.il/cgroup97/test2/api/GetHouseHoldCustomRequests?hotelID=1002";

  const res = await fetch(url);

  let names = Data[cat].map((item) => item.name);
  let Allnames = [];
  Object.keys(Data).forEach(function (key) {
    Data[key].forEach((item) => Allnames.push(item.name));
  });

  let arr = await res.json();
  console.log("arr :", arr);

  let filteredArr = arr; // filters the data sent through to the table
  console.log("filteredArr :", filteredArr);

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
  const [searchTerm, setSearchTerm] = useState([]);

  const [dataList, setDataList] = useState([]);

  const [filteredChats, setFilteredChats] = useState(tasks);
  const [inputKey, setInputKey] = useState(0);
  useEffect(() => {
    const filteredChats = tasks.filter(
      (task) =>
        task.requestID
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        task.roomNumber
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase())
    );
    setFilteredChats(filteredChats);
  }, [searchTerm, tasks]);

  const setIsMarked = (id, typeID) => {
    deleteRow.mutate({ id, typeID });
  };

  const deleteRow = useMutation(
    async ({ id, typeID }) => {

      let url;

      if (cat === "Room Service") {
        url = `http://proj.ruppin.ac.il/cgroup97/test2/api/MarkRoomServiceRequest?requestID=${id}&itemsCount=${typeID}`
      } else {
        url = `http://proj.ruppin.ac.il/cgroup97/test2/api/MarkCustomRequest?requestID=${id}&typeID=${typeID}`
      }

      await fetch(
        url,
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
      if (!postObject) { return }
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
          console.log({ errorDetails: data })
          if (data.type && data.type === "NonActiveRoom") {
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
    if (Object.entries(newRow).length !== 0) {
      if (cat !== "Room Service" && newRow.customName === "" && CheckIfCustom()) {
        alert("Custom item must have a name");
      } else if (newRow.typeID === "") {
        alert("Please make sure to select an item");
      } else if (newRow.amount !== "" && newRow.roomNumber !== "") {
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
    const requestHour = date.toLocaleTimeString("en-GB", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    const status = "open";

    retVal["requestDate"] = requestDate;
    retVal["requestHour"] = requestHour;
    retVal["status"] = status;



    const requestInOrder = [];
    if (cat !== "Room Service") {
      //creating the children
      const houseHold_Request = {};

      if (newRow.requestedDate || newRow.requestedHour) {
        const requestedDate = convertDateToRequiredFormat(newRow.requestedDate);
        const requestedHour = newRow.requestedHour;

        requestInOrder[0] = {
          requestedDate,
          requestedHour,
        };
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
    } else {
      requestInOrder[0] = {
        price: newRow.amount * newRow.price
      };

      console.log("Room service Type" + " " + newRow.roomServiceType)
      if (!newRow.roomServiceType) {
        console.log("The room service creation must have roomService Type")
        return null
      }

      if (!newRow.typeID) {
        console.log("The room service creation must have item ID")
        return null
      }

      const roomServiceOrder = {};


      if (newRow.roomServiceType === "AdditionlItems") {
        const additionalItemsRoomService = [];
        additionalItemsRoomService[0] = {
          ID: newRow.ID,
          amount: newRow.amount
        }

        roomServiceOrder["Additional_Items_Room_Service"] = additionalItemsRoomService;
      }
      else {
        const foodAndDrinksRoomService = [];
        foodAndDrinksRoomService[0] = {
          ID: newRow.typeID,
          amount: newRow.amount,
          changes: newRow.changes,
          itemsCount: 1
        }

        roomServiceOrder["Food_And_Drinks_Room_Service"] = foodAndDrinksRoomService;
      }

      retVal["Room_Service_Order"] = roomServiceOrder;
    }

    if (requestInOrder.length == 0) {
      const emptyObject = {};
      requestInOrder[0] = emptyObject;
    }

    retVal["Request_In_Order"] = requestInOrder;

    console.log(retVal)
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
      (obj) => obj.typeID === newRow.typeID
    )?.name;

    return customTypeName && customTypeName === "CUSTOM";
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleSearchClear = () => {
    setSearchTerm("");
    setInputKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <span className="header">Task List</span>
      </div>
      <div style={{marginTop:-150}}>
        {tasks && tasks.length > 0 ? (
          <div className="container">
            <Input
              placeholder="Search Room Number or Request Id "
              onChange={handleSearchChange}
              onClear={handleSearchClear}
              leftIcon={{ type: "search" }}
              key={inputKey}
              inputStyle={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                width: "100%",
                boxSizing: "border-box",
                marginLeft: "40px",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px solid black",
                padding: "9px 0",
                marginTop: "50px",
              }}
            >
              <div style={{ flex: "1", textAlign: "center" }}>Request id</div>
              <div style={{ flex: "1", textAlign: "center" }}>Amount</div>
              <div style={{ flex: "1", textAlign: "center" }}>Name</div>
              <div style={{ flex: "1", textAlign: "center" }}>Request Date</div>
              <div style={{ flex: "1", textAlign: "center" }}>Request Time</div>
              {cat === "Room Service" ? (
                <>
                  <div style={{ flex: "1", textAlign: "center" }}>Price</div>
                  <div style={{ flex: "1", textAlign: "center" }}>Changes</div>
                </>
              ) : (
                <>
                  <div style={{ flex: "1", textAlign: "center", color: "red" }}>
                    Requested Date{" "}
                  </div>
                  <div style={{ flex: "1", textAlign: "center", color: "red" }}>
                    {" "}
                    Requested Time
                  </div>
                </>
              )}

              <div style={{ flex: "1", textAlign: "center" }}>Room Number</div>
              <div style={{ flex: "1", textAlign: "center" }}>Complete</div>
            </div>
            {searchTerm === ""
              ? tasks.sort((a, b) => new Date(a.requestDate) > new Date(b.requestDate)).map((item, index) =>
                !item.isMarked && cat === "Room Service" ? (
                  <RoomServiceTaskRow
                    item={item}
                    key={index}
                    setIsMarked={setIsMarked}
                    dataList={cat}
                  />
                ) : (
                  <HouseHoldTaskRow
                    item={item}
                    key={index}
                    setIsMarked={setIsMarked}
                    dataList={cat}
                  />
                )
              )
              : filteredChats.sort((a, b) => new Date(a.requestDate) - new Date(b.requestDate)).map((item, index) =>
                !item.isMarked && cat === "Room Service" ? (
                  <RoomServiceTaskRow
                    item={item}
                    key={index}
                    setIsMarked={setIsMarked}
                    dataList={cat}
                  />
                ) : (
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
              cat={cat}
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
      </div>
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
