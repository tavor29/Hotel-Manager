import React, { useEffect, useState } from "react";
import Data from "../data/TaskData";

function AddTaskForm({ setNewRow, handleSubmit, cat, ref }) {
  const currentDate = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(currentDate.getDate() + 1);

  const [amount, setAmount] = useState("");
  const [requestedDate, setrequestedDate] = useState("");
  const [requestedHour, setrequestedHour] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState("");
  const [customName, setCustomName] = useState("");
  const [changes, setChanges] = useState("");
  const [dataList, setDataList] = useState([]);
  const [isCustom, setIsCustom] = useState(false);

  const [roomServiceType, setRoomServiceType] = useState(null);
  const [price, setPrice] = useState(null);


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


  const handleSetType = (value) => {
    if (cat === "Room Service") {
      const obj = dataList?.filter(obj => obj.ID == value)[0];

      setRoomServiceType(obj.type);
      setPrice(obj.price)
      setType(value)

    }
    else if (cat === "Room Cleaning") {
      const val = dataList.filter(obj => obj.name === value);
      setType(val[0].value)
    }
    else {
      setType(value)
    }
  }

  useEffect(() => {

    if (
      amount !== "" ||
      requestedDate !== "" ||
      requestedHour !== "" ||
      roomNumber !== "" ||
      type !== "" ||
      customName !== "" ||
      changes !== ""
    ) {
      setNewRow({
        amount,
        requestedDate,
        requestedHour,
        roomNumber,
        typeID: type,
        customName,
        changes,
        price,
        roomServiceType,
        clearRow,
      });
    }
  }, [amount, requestedDate, requestedHour, roomNumber, type, customName, changes, roomServiceType, price]);

  const getData = async () => {
    if (cat === "Room Cleaning") {
      setDataList([{ name: "To Clean", value: 1 }, { name: "Not To Clean", value: 0 }])
    }
    else {
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
          console.log("dataList:" + JSON.stringify(json))
          setDataList(json);
        }
      } catch (error) { }
    }
  };

  const getDateOptions = () => {
    const options = [];
    options.push(
      cat === "Room Cleaning" ?
        <option key="tommorow" value={tomorrow.toLocaleDateString("en-GB")}>
          Tomorrow
        </option>
        :
        <option key="today" value={currentDate.toLocaleDateString("en-GB")}>
          Today
        </option>
    );
    for (let i = cat === "Room Cleaning" ? 2 : 1; i <= 3; i++) {
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

  useEffect(() => {
    if (type == 12) {
      setIsCustom(true)
    } else {
      setIsCustom(false)
    }
  }, [type])


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
                  width: cat === "Room Service" ? "60" : "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: cat === "Room Service" ? "space-between" : "space-around",
                  flex: 1
                }}
              >
                <div style={{ width: isCustom || cat === "Room Service" ? "45%" : "90%" }}>
                  <select
                    ref={ref}
                    name="name"
                    placeholder="Name"
                    style={{
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                    }}
                    onChange={(e) => handleSetType(e.target.value)} //sets type to the chosen value (toiletpaper/towel/shampoo)
                    value={
                      type === ""
                        ? "Select Item"
                        :
                        cat !== "Room Service" ?
                          dataList?.find((x) => x.typeID === type)?.name
                          :
                          cat === "Room Cleaning" ?
                            dataList?.find((x) => x.value === type)?.name
                            :
                            dataList?.find((x) => x.ID === type)?.name
                    } //returns the type in the datalist fetched from the server.
                  >
                    <option disabled>Select Item</option>
                    {dataList?.map((item) => (
                      <option value={cat === "Room Service" ? item.ID : item.typeID} key={cat === "Room Service" ? item.ID : item.typeID}>
                        {item.name.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>
                {isCustom ? (
                  <div style={{ width: "45%" }}>
                    <input //item name in case of custom
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
                {
                  cat === "Room Service" ?
                    <div style={{ width: "45%" }}>
                      <input //changes in case of room service
                        type="text"
                        value={changes}
                        placeholder="Changes"
                        onChange={(e) => setChanges(e.target.value)}
                        style={{
                          textAlign: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                    :
                    <></>
                }
              </div>
              <div
                style={{
                  width: cat === "Room Service" ? "45%" : "60%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                {
                  cat !== "Room Cleaning" ?
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
                    :
                    <>
                    </>
                }
                {cat !== "Room Service" ?
                  <>
                    <div style={cat === "Room Cleaning" ? { width: "30%" } : { width: "23%" }}>
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
                  </>
                  :
                  <></>
                }
                <div style={cat === "Room Cleaning" ? { width: "24%" } : { width: "18%" }}>
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
