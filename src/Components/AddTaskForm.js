import React, { useEffect, useState } from "react";
import Data from "../data/TaskData";

function AddTaskForm({ setNewRow, handleSubmit, dataList, setDataList, cat }) {
  const currentDate = new Date();

  const [amount, setAmount] = useState("");
  const [requestedDate, setrequestedDate] = useState("");
  const [requestedHour, setrequestedHour] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState("");
  const [customName, setCustomName] = useState("");

  const clearRow = () => {
    setAmount("");
    setrequestedDate("");
    setrequestedHour("");
    setRoomNumber("");
    setType("");
    setCustomName("");
    setNewRow({});
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (
      amount !== "" ||
      requestedDate !== "" ||
      requestedHour !== "" ||
      roomNumber !== "" ||
      type !== "" ||
      customName !== ""
    ) {
      setNewRow({
        amount,
        requestedDate,
        requestedHour,
        roomNumber,
        typeID: type,
        customName,
        clearRow,
      });
    }
  }, [amount, requestedDate, requestedHour, roomNumber, type, customName]);

  const getData = async () => {
    let url = "";

    try {
      if (cat === "Room Service") {
        url =
          "http://proj.ruppin.ac.il/cgroup97/test2/api/GetFoodTypes?hotelID=1002";
      } else
        url =
          "http://proj.ruppin.ac.il/cgroup97/test2/api/GetHouseHoldCustomTypes";

      const res = await fetch(url);
      const json = await res.json();

      if (res.ok) {
        setDataList(json);
      }
    } catch (error) {}
  };

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

  const CheckIfCustom = () => {
    const customTypeName = dataList?.find(
      (obj) => obj.typeID && obj.typeID === type
    )?.name; //returns the type in the datalist fetched from the server.
    return customTypeName && customTypeName === "CUSTOM";
  };

  return (
    <>
      {dataList && dataList.length > 0 ? (
        <div>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px solid black",
                padding: "10px 0",
                height: "100%",
              }}
            >
              <div
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div style={{ width: CheckIfCustom() ? "45%" : "90%" }}>
                  <select
                    name="name"
                    placeholder="Name"
                    style={{
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                    }}
                    onChange={(e) => setType(e.target.value)} //sets type to the chosen value (toiletpaper/towel/shampoo)
                    value={
                      type === ""
                        ? "Select Item"
                        : dataList?.find((x) => x.typeID === type)?.name
                    } //returns the type in the datalist fetched from the server.
                  >
                    <option disabled>Select Item</option>
                    {dataList?.map((item) => (
                      <option value={item.typeID} key={item.typeID}>
                        {item.name.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>
                {CheckIfCustom() ? (
                  <div style={{ width: "45%" }}>
                    <input //Amount
                      type="text"
                      value={customName}
                      placeholder="Item name"
                      onChange={(e) => setCustomName(e.target.value)}
                      style={{
                        textAlign: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                style={{
                  width: "60%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <div style={{ width: "13%" }}>
                  <input //Amount
                    type="text"
                    value={amount}
                    placeholder="Amount"
                    onChange={(e) => setAmount(e.target.value)}
                    style={{
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <div style={{ width: "23%" }}>
                  <input // DateOptions
                    list="DateOptions"
                    value={requestedDate}
                    placeholder="Requested Date"
                    onChange={(e) => setrequestedDate(e.target.value)}
                    style={{
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <datalist id="DateOptions">{getDateOptions()}</datalist>
                </div>
                <div style={{ width: "18%" }}>
                  <input //HourOptions
                    type="time"
                    value={requestedHour}
                    placeholder="Requested Time"
                    onChange={(e) => setrequestedHour(e.target.value)}
                    style={{
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <div style={{ width: "18%" }}>
                  <input // roomNumber
                    type="text"
                    value={roomNumber}
                    placeholder="Room Number"
                    onChange={(e) => setRoomNumber(e.target.value)}
                    style={{
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <div style={{ width: "18%" }}>
                  <button type="submit" className="btn1" onClick={handleSubmit}>
                    Create Task
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default AddTaskForm;
