import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import React from "react";
import "../../styles/TasksStyle.css";

const queryClient = new QueryClient();

const fetchTable = async () => {
  const res = await fetch(
    "http://proj.ruppin.ac.il/cgroup97/test2/api/GetHouseHoldCustomRequests?hotelID=1001"
  );

  // console.log(res.json());
  return res.json();
};

function Table() {
  const queryClient2 = useQueryClient();

  const { data, status, isLoading, isError, isFetching } = useQuery(
    "users",
    fetchTable
  );
  console.log(data);
  console.log(status);

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

  const [newData, setNewData] = useState({});

  const addRow = useMutation(
    async () => {
      await fetch(
        "http://proj.ruppin.ac.il/cgroup97/test2/api/GetHouseHoldCustomRequests?hotelID=1001",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );
    },
    {
      onSuccess: () => {
        queryClient2.invalidateQueries("tableData");
      },
    }
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(name + "" + value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addRow.mutate();
  };

  if (isLoading) {
    console.log("loading");
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log("failed to fetch");
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Avatar</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.email}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>
                  <img src={row.avatar} alt="Avatar" />
                </td>
                <td>
                  <button onClick={() => deleteRow.mutate(row.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isFetching && <p>Refreshing...</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={handleInputChange}
          />
          <button type="submit">Add Row</button>
        </form>
      </div>
    </>
  );
}

export default function Tasks() {
  return (
    <QueryClientProvider client={queryClient}>
      <Table />
    </QueryClientProvider>
  );
}
