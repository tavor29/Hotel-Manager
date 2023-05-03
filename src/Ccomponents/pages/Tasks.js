import React, { useEffect, useState } from "react";
import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import "../../styles/TasksStyle.css";
import HouseHoldTaskRow from "../HouseHoldTaskRow";
import Form from "../AddTaskForm";

const fetchTable = async () => {
  const res = await fetch(
    "http://proj.ruppin.ac.il/cgroup97/test2/api/GetHouseHoldCustomRequests?hotelID=1001"
  );
  return res.json();
};

const queryClient = new QueryClient();

function TableComponent() {
  const queryClient2 = useQueryClient();

  const { data, isLoading, isError, isFetching } = useQuery(
    "tableData",
    fetchTable

    // { refetchInterval: 30000 }
  );

  useEffect(() => {
    if (data) {
      setNewTasks(data);
    }
  }, [data]);

  const [newRow, setNewRow] = useState({
    requestID: "",
    amount: "",
    name: "",
    requestDate: "",
    requestHour: "",
  });

  const [tasks, setTasks] = useState([]);

  const setNewTasks = (newTasks) => {
    const currentTasksIds = [...new Set(tasks.map((task) => task.requestID))];
    const addedTasks = [...newTasks];
    addedTasks.filter((task) => !currentTasksIds.includes(task.requestID));
    if (addedTasks.length > 0) setTasks([...tasks, ...addedTasks]);
  };

  const handleDelete = (index) => {
    deleteRow.mutate(index);
  };

  const deleteRow = useMutation(
    async (id) => {
      await fetch(
        `http://proj.ruppin.ac.il/cgroup97/test2/api/GetHouseHoldCustomRequests?hotelID=1001/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log("fetching");
    },
    {
      onSuccess: () => {
        queryClient2.invalidateQueries("tableData");
      },
    }
  );

  const addRow = useMutation(
    async () => {
      await fetch(
        "http://proj.ruppin.ac.il/cgroup97/test2/api/GetHouseHoldCustomRequests?hotelID=1001",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRow),
        }
      );
      console.log("fetching");
    },
    {
      onSuccess: () => {
        queryClient2.invalidateQueries("tableData");
      },
    }
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRow((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addRow.mutate();
    setNewRow({
      requestID: "",
      amount: "",
      name: "",
      requestDate: "",
      requestHour: "",
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <span className="header">Task List</span>
      <div className="container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            borderBottom: "1px solid black",
            padding: "9px 0",
          }}
        >
          <div style={{ flex: "1", textAlign: "center" }}>Amount</div>
          <div style={{ flex: "1", textAlign: "center" }}>Name</div>
          <div style={{ flex: "1", textAlign: "center" }}>Request Date</div>
          <div style={{ flex: "1", textAlign: "center" }}>Request Time</div>
          <div style={{ flex: "1", textAlign: "center" }}>Room Number</div>
          <div style={{ flex: "1", textAlign: "center" }}>Complete</div>
        </div>
        {tasks.map((item, index) => (
          <HouseHoldTaskRow item={item} key={index} deleteFunc={handleDelete} />
        ))}
        <Form
          addRow={addRow}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          newRow={newRow}
        />
        {isFetching && <p>Refreshing...</p>}
      </div>
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
