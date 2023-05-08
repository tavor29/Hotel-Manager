import React, { useEffect, useState } from "react";
import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import "../../styles/TasksStyle.css";
import HouseHoldTaskRow from "../../Components/HouseHoldTaskRow";
import Form from "../../Components/AddTaskForm";

const fetchTable = async () => {
  const res = await fetch(
    "http://proj.ruppin.ac.il/cgroup97/test2/api/GetHouseHoldCustomRequests?hotelID=1002"
  );
  return res.json();
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
      console.log(postObject);
      console.log("Posting");
      return response;
    },
    {
      onSuccess: async (res) => {
        queryClient2.invalidateQueries("tableData");
        const data = await res.json();
        console.log(data);
        if (data.type && data.type == "NonActiveRoom") {
          if (data.message) {
            alert(data.message);
          }
        } else {
          alert("Please make sure to select an item");
        }
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newRow.amount != "" && newRow.roomNumber != "") {
      addRow.mutate();
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
      const requestedDate = newRow.requestedDate;
      const requestedHour = newRow.requestedHour;

      requestInOrder[0] = {
        requestedDate,
        requestedHour,
      };

      retVal["Request_In_Order"] = requestInOrder;
    }

    //creating the grand children
    const addedCustomRequest = { typeID: newRow.typeID, amount: newRow.amount };
    const houseHold_Custom_Request = [addedCustomRequest];

    // setting the grand child to his parent
    houseHold_Request["HouseHold_Custom_Request"] = houseHold_Custom_Request;

    //setting the childredn to the parent
    retVal["HouseHold_Request"] = houseHold_Request;

    return retVal;
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
                />
              )
          )}
          <Form
            types={"Toiletries"}
            addRow={addRow}
            setNewRow={setNewRow}
            handleSubmit={handleSubmit}
            newRow={newRow}
            dataList={dataList}
            setDataList={setDataList}
          />
          {isFetching && <p>Refreshing...</p>}
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
            No tasks have found
          </div>
          <Form
            types={"Toiletries"}
            addRow={addRow}
            setNewRow={setNewRow}
            handleSubmit={handleSubmit}
            newRow={newRow}
          />
        </div>
      )}
    </>
  );
}

export default function Tasks() {
  return (
    <QueryClientProvider client={queryClient}>
      <TableComponent />
    </QueryClientProvider>
  );
}
