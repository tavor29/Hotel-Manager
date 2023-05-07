import React, { useEffect, useState } from "react";
function AddTaskForm({ setNewRow, handleSubmit }) {
  const currentDate = new Date();

  const [dataList, setDataList] = useState([]);
  const [amount, setAmount] = useState("");
  const [requestedDate, setrequestedDate] = useState("");
  const [requestedHour, setrequestedHour] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (
      amount != "" ||
      requestedDate != "" ||
      requestedHour != "" ||
      roomNumber != "" ||
      type != ""
    ) {
      setNewRow({
        amount,
        requestedDate,
        requestedHour,
        roomNumber,
        typeID: type,
      });
    }
  }, [amount, requestedDate, requestedHour, roomNumber, type]);

  const getData = async () => {
    try {
      const res = await fetch(
        "http://proj.ruppin.ac.il/cgroup97/test2/api/GetHouseHoldCustomTypes"
      );
      if (res.ok) {
        const json = await res.json();
        setDataList(json);
      }
    } catch (error) {}
  };

  // const fetchTable = async () => {
  //   try {
  //     const res = await fetch(
  //       "http://proj.ruppin.ac.il/cgroup97/test2/api/GetHouseHoldCustomTypes"
  //     );
  //     if (res.ok) {
  //       const json = await res.json();
  //       Datalist(json);
  //     }
  //     return res.json();
  //   } catch (error) {}
  // };

  // console.log(fetchTable);

  const getDateOptions = () => {
    const options = [];
    options.push(
      <option key="today" value={currentDate.toLocaleDateString("en-GB")}>
        Today
      </option>
    );
    for (let i = 1; i <= 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const formattedDate = date.toLocaleDateString("en-GB");
      options.push(
        <option key={`option-${i}`} value={formattedDate}>
          {formattedDate}
        </option>
      );
    }
    return options;
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              borderBottom: "1px solid black",
              padding: "10px 0",
            }}
          >
            <select
              name="name"
              placeholder="Name"
              style={{ flex: "1", textAlign: "center" }}
              onChange={(e) => setType(e.target.value)}
            >
              {dataList.map((item) => (
                <option value={item.typeID} key={item.typeID}>
                  {item.name} Id = {item.typeID}
                </option>
              ))}
            </select>

            <input //Amount
              type="text"
              value={amount}
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
              style={{ flex: "1", textAlign: "center" }}
            />

            <input // DateOptions
              list="DateOptions"
              value={requestedDate}
              placeholder="Requested Date"
              onChange={(e) => setrequestedDate(e.target.value)}
              style={{ flex: "1", textAlign: "center" }}
            />
            <datalist id="DateOptions">{getDateOptions()}</datalist>

            <input //HourOptions
              type="time"
              value={requestedHour}
              placeholder="Requested Time"
              onChange={(e) => setrequestedHour(e.target.value)}
              style={{ flex: "1", textAlign: "center" }}
            />
            {/* <datalist id="HourOptions">{getTimeOptions()}</datalist> */}

            <input // roomNumber
              type="text"
              value={roomNumber}
              placeholder="Room Number"
              onChange={(e) => setRoomNumber(e.target.value)}
              style={{ flex: "1" }}
            />

            <button type="submit" className="btn1" onClick={handleSubmit}>
              Create Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTaskForm;

// const getTimeOptions = () => {
//   const options = [];

//   const now = new Date();
//   const currentMinute = now.getMinutes();

//   for (let hour = 0; hour < 24; hour++) {
//     const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
//     const formattedMinute =
//       currentMinute < 10 ? `0${currentMinute}` : `${currentMinute}`;
//     const time = `${formattedHour}:${formattedMinute}`;

//     options.push(
//       <option key={`option-${hour}`} value={time}>
//         {time}
//       </option>
//     );
//   }
//   return options;
// };
