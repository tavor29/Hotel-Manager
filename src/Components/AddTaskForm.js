import React from "react";

function AddTaskForm({ addRow, handleInputChange, handleSubmit, newRow }) {
  const currentDate = new Date();

  const getTimeOptions = () => {
    const options = [];

    const now = new Date();
    const currentMinute = now.getMinutes();

    for (let hour = 0; hour < 24; hour++) {
      const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
      const formattedMinute =
        currentMinute < 10 ? `0${currentMinute}` : `${currentMinute}`;
      const time = `${formattedHour}:${formattedMinute}`;

      options.push(
        <option key={`option-${hour}`} value={time}>
          {time}
        </option>
      );
    }
    return options;
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
            <input //itemNames
              list="names"
              name="itemNames"
              placeholder="Name"
              value={newRow.myBrowser}
              onChange={handleInputChange}
              style={{ flex: "1", textAlign: "center" }}
            />
            <datalist id="names">
              <option value="Towel" />
              <option value="Toilet Paper" />
              <option value="Condoms" />
              <option value="Room Service" />
              <option value="Cleaning" />
            </datalist>

            <input //Amount
              type="text"
              name="amount"
              placeholder="Amount"
              value={newRow.amount}
              onChange={handleInputChange}
              style={{ flex: "1", textAlign: "center" }}
            />

            <input // DateOptions
              list="DateOptions"
              name="requestDate"
              placeholder="Requested Date"
              value={newRow.requestDate}
              onChange={handleInputChange}
              style={{ flex: "1", textAlign: "center" }}
            />
            <datalist id="DateOptions">{getDateOptions()}</datalist>

            <input //HourOptions
              type="time"
              name="requestHour"
              placeholder="Requested Time"
              value={newRow.requestHour}
              onChange={handleInputChange}
              style={{ flex: "1", textAlign: "center" }}
            />
            <datalist id="HourOptions">{getTimeOptions()}</datalist>

            <input // roomNumber
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={newRow.roomNumber}
              onChange={handleInputChange}
              style={{ flex: "1" }}
            />

            <button
              type="submit"
              className="btn1"
              onClick={() => addRow.mutate()}
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTaskForm;
