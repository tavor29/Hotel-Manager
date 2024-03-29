import React, { useEffect, useRef, useState } from "react";
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
import RoomServiceTaskRow from "./RoomServiceTaskRow";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "react-chat-elements";
import RoomCleaningTaskRow from "./RoomCleaningTaskRow";

let cat = "";

const fetchTable = async () => {
  let url = "";

  if (cat === "Room Service") {
    url =
      "https://proj.ruppin.ac.il/cgroup97/prod/api/GetRoomServiceRequest?hotelID=1002";
  } else if (cat === "Room Cleaning") {
    url =
      "https://proj.ruppin.ac.il/cgroup97/prod/api/GetRoomCleaningSchedule?hotelID=1002";
  } else
    url =
      "https://proj.ruppin.ac.il/cgroup97/prod/api/GetHouseHoldCustomRequests?hotelID=1002";

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

  const formRef = useRef(null);

  const handleCreateTaskClick = () => {
    if (formRef.current) {
      formRef.current.focus();
    }
  };

  const [newRow, setNewRow] = useState({});

  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  const [dataList, setDataList] = useState([]);

  const [filteredChats, setFilteredChats] = useState(tasks);
  const [inputKey, setInputKey] = useState(0);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        url = `https://proj.ruppin.ac.il/cgroup97/prod/api/MarkRoomServiceRequest?requestID=${id}&itemsCount=${typeID}`;
      } else if (cat === "Room Cleaning") {
        url = `https://proj.ruppin.ac.il/cgroup97/prod/api/MarkCleaningRequest?requestID=${id}`;
      } else {
        url = `https://proj.ruppin.ac.il/cgroup97/prod/api/MarkCustomRequest?requestID=${id}&typeID=${typeID}`;
      }

      await fetch(url, {
        method: "PUT",
      });
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
      console.log(postObject);
      if (!postObject) {
        return;
      }
      const response = await fetch(
        `https://proj.ruppin.ac.il/cgroup97/prod/api/AdminCreateHouseHoldRequest?roomNum=${newRow.roomNumber}&hotelID=1002`,
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
          console.log({ errorDetails: data });
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
      if (
        cat !== "Room Service" &&
        cat !== "Room Cleaning" &&
        newRow.customName === "" &&
        CheckIfCustom()
      ) {
        alert("Custom item must have a name");
      } else if (newRow.typeID === "") {
        alert("Please make sure to select an item");
      } else if (
        cat === "Room Cleaning" &&
        newRow.requestedDate &&
        newRow.roomNumber !== ""
      ) {
        addRow.mutate();
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
        const requestedHour =
          newRow.requestedHour !== "" ? newRow.requestedHour : null;

        requestInOrder[0] = {
          requestedDate,
          requestedHour,
        };
      }

      //creating the grand children
      if (cat !== "Room Cleaning") {
        const isCustomType = CheckIfCustom();
        console.log(isCustomType);
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
        houseHold_Request["HouseHold_Custom_Request"] =
          houseHold_Custom_Request;
      } else {
        const householdCleaningRequest = {
          toClear: newRow.typeID,
        };

        houseHold_Request["HouseHold_Cleaning_Request"] =
          householdCleaningRequest;
      }
      //setting the childredn to the parent
      retVal["HouseHold_Request"] = houseHold_Request;
    } else {
      requestInOrder[0] = {
        price: newRow.amount * newRow.price,
      };

      console.log("Room service Type" + " " + newRow.roomServiceType);
      if (!newRow.roomServiceType) {
        console.log("The room service creation must have roomService Type");
        return null;
      }

      if (!newRow.typeID) {
        console.log("The room service creation must have item ID");
        return null;
      }

      const roomServiceOrder = {};

      if (newRow.roomServiceType === "AdditionlItems") {
        const additionalItemsRoomService = [];
        additionalItemsRoomService[0] = {
          ID: newRow.ID,
          amount: newRow.amount,
        };

        roomServiceOrder["Additional_Items_Room_Service"] =
          additionalItemsRoomService;
      } else {
        const foodAndDrinksRoomService = [];
        foodAndDrinksRoomService[0] = {
          ID: newRow.typeID,
          amount: newRow.amount,
          changes: newRow.changes,
          itemsCount: 1,
        };

        roomServiceOrder["Food_And_Drinks_Room_Service"] =
          foodAndDrinksRoomService;
      }

      retVal["Room_Service_Order"] = roomServiceOrder;
    }

    if (requestInOrder.length == 0) {
      const emptyObject = {};
      requestInOrder[0] = emptyObject;
    }

    retVal["Request_In_Order"] = requestInOrder;

    console.log(retVal);
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
    return newRow && newRow.typeID == 12;
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
      {isScrolled ? (
        <div
          className="container"
          style={{ position: "fixed", zIndex: 100, top: -50, right: 5 }}
        >
          <FontAwesomeIcon
            className="fontAwsomeArrowUp"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth", duration: 420 })
            }
            icon={faCircleUp}
            style={{ fontSize: 30 }}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="container" style={{ marginTop: 0 }}>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: "45%" }}>
            <button
              style={{ padding: 4, borderRadius: 15, borderWidth: 1 }}
              onClick={handleCreateTaskClick}
            >
              <p style={{ fontWeight: "bold" }}>Create Task</p>
            </button>
          </div>
          <div style={{ width: "55%" }}>
            <span style={{ fontWeight: "bold", fontSize: 30 }}>Task List</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: -150 }}>
        {tasks && tasks.length > 0 ? (
          <div className="container">
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Input
                placeholder="Search Room Number or Request Id"
                onChange={handleSearchChange}
                onClear={handleSearchClear}
                key={inputKey}
                inputStyle={{
                  backgroundColor: "#fff",
                  boxSizing: "border-box",
                  padding: "8px",
                  margin: "0",
                }}
              />
            </div>
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
              {cat === "Room Cleaning" ? (
                <div style={{ flex: "1", textAlign: "center" }}>To Clean</div>
              ) : (
                <></>
              )}
              {cat !== "Room Cleaning" ? (
                <>
                  <div style={{ flex: "1", textAlign: "center" }}>Amount</div>
                  <div style={{ flex: "1", textAlign: "center" }}>Name</div>
                  <div style={{ flex: "1", textAlign: "center" }}>
                    Request Date
                  </div>
                  <div style={{ flex: "1", textAlign: "center" }}>
                    Request Time
                  </div>
                </>
              ) : (
                <></>
              )}
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
              ? tasks
                  .sort(
                    (a, b) => new Date(a.requestDate) > new Date(b.requestDate)
                  )
                  .map((item, index) =>
                    !item.isMarked && cat === "Room Service" ? (
                      <RoomServiceTaskRow
                        item={item}
                        key={index}
                        setIsMarked={setIsMarked}
                        dataList={cat}
                      />
                    ) : cat === "Room Cleaning" ? (
                      <RoomCleaningTaskRow
                        item={item}
                        key={index}
                        setIsMarked={setIsMarked}
                      />
                    ) : (cat === "Toiletries" && item.typeID != 12) ||
                      cat === "CustomRequests" ? (
                      <HouseHoldTaskRow
                        item={item}
                        key={index}
                        setIsMarked={setIsMarked}
                      />
                    ) : (
                      <></>
                    )
                  )
              : filteredChats
                  .sort(
                    (a, b) => new Date(a.requestDate) - new Date(b.requestDate)
                  )
                  .map((item, index) =>
                    !item.isMarked && cat === "Room Service" ? (
                      <RoomServiceTaskRow
                        item={item}
                        key={index}
                        setIsMarked={setIsMarked}
                      />
                    ) : cat === "Room Cleaning" ? (
                      <RoomCleaningTaskRow
                        item={item}
                        key={index}
                        setIsMarked={setIsMarked}
                      />
                    ) : (cat === "Toiletries" && item.typeID != 12) ||
                      cat === "CustomRequests" ? (
                      <HouseHoldTaskRow
                        item={item}
                        key={index}
                        setIsMarked={setIsMarked}
                      />
                    ) : (
                      <></>
                    )
                  )}{" "}
            {isFetching && <p>Refreshing...</p>}
            <div ref={formRef} tabIndex={0}>
              <Form //create task form
                addRow={addRow}
                setNewRow={setNewRow}
                handleSubmit={handleSubmit}
                newRow={newRow}
                cat={cat}
              />
            </div>
          </div>
        ) : (
          <div className="container">
            <div>
              <p style={{ textAlign: "center", fontWeight: "bold" }}>
                No tasks available
              </p>
            </div>
            <div ref={formRef} tabIndex={0}>
              <Form //create task form
                addRow={addRow}
                setNewRow={setNewRow}
                handleSubmit={handleSubmit}
                newRow={newRow}
                cat={cat}
              />
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
