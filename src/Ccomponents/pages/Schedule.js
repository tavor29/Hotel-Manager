import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/Dash+SchedStyle.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

//next: delete and edit option for reservations using a modal box

export default function Schedule() {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState(null);

  useEffect(() => {
    const data = generateFakeReservations();
    setReservations(data);
  }, []);

  const generateFakeReservations = () => {
    const reservations = [];
    const today = new Date();
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();
    const numReservations = Math.floor(Math.random() * 10) + 15; // Random number of reservations (1-10)

    for (let i = 0; i < numReservations; i++) {
      const reservationStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        getRandomDay(startOfMonth, endOfMonth),
        getRandomHour(),
        getRandomMinute()
      );
      const reservationEnd = new Date(
        reservationStart.getFullYear(),
        reservationStart.getMonth(),
        reservationStart.getDate(),
        reservationStart.getHours() + Math.floor(Math.random() * 3) + 1,
        getRandomMinute()
      );

      const reservation = {
        id: i,
        title: `Room ${i}`,
        start: reservationStart,
        end: reservationEnd,
      };

      reservations.push(reservation);
    }

    return reservations;
  };

  const getRandomDay = (start, end) => {
    const startTime = start.getTime();
    const endTime = end.getTime();
    return moment(startTime + Math.random() * (endTime - startTime)).date();
  };

  const getRandomHour = () => {
    return Math.floor(Math.random() * 24);
  };

  const getRandomMinute = () => {
    return Math.floor(Math.random() * 60);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.id % 2 === 0 ? "#e6b576" : "#e6cba9";
    const borderColor = event.id % 2 === 0 ? "#007bff" : "#007bff";
    const style = {
      backgroundColor,
      borderColor,
      borderRadius: "5px",
      color: "#000",
      display: "block",
      padding: "4px",
    };
    return {
      style,
    };
  };

  const handleSelectSlot = ({ start, end }) => {
    setNewReservation({
      title: "",
      start,
      end,
    });
  };

  const handleSelectEvent = (event) => {
    const confirmDelete = window.confirm(
      "Would you like to delete this reservation?"
    );
    if (confirmDelete) {
      const updatedReservations = reservations.filter(
        (res) => res.id !== event.id
      );
      setReservations(updatedReservations);
    } else {
      // Handle cancel action if needed
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReservation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveReservation = () => {
    if (newReservation.title.trim() === "") {
      alert("Please enter a reservation name.");
      return;
    }

    const startDateTime = moment(newReservation.start).toDate();
    const endDateTime = moment(newReservation.end).toDate();

    const newEvent = {
      id: reservations.length,
      title: newReservation.title,
      start: startDateTime,
      end: endDateTime,
    };

    const updatedReservations = [...reservations, newEvent];

    setReservations(updatedReservations);
    setNewReservation(null);
  };

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };
    const updatedReservations = reservations.map((res) =>
      res.id === updatedEvent.id ? updatedEvent : res
    );
    setReservations(updatedReservations);
  };

  const handleEventResize = ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };
    const updatedReservations = reservations.map((res) =>
      res.id === updatedEvent.id ? updatedEvent : res
    );
    setReservations(updatedReservations);
  };

  return (
    <div className="container">
      <div>
        <div className="Schedule">
          <h1>Spa Reservations</h1>
          <DragAndDropCalendar
            localizer={localizer}
            events={reservations}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            eventPropGetter={eventStyleGetter}
            defaultView="month"
            views={["month", "week"]}
            resizable
            selectable
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
          />
          {newReservation && (
            <div className="modal">
              <div className="modal-content">
                <h2>New Reservation</h2>
                <div>
                  <label>Reservation Name:</label>
                  <input
                    type="text"
                    name="title"
                    value={newReservation.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Start Date:</label>
                  <input
                    type="date"
                    name="start"
                    value={moment(newReservation.start).format("YYYY-MM-DD")}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Start Time:</label>
                  <input
                    type="time"
                    name="startTime"
                    value={newReservation.startTime}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>End Date:</label>
                  <input
                    type="date"
                    name="end"
                    value={moment(newReservation.end).format("YYYY-MM-DD")}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>End Time:</label>
                  <input
                    type="time"
                    name="endTime"
                    value={newReservation.endTime}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-buttons">
                  <button onClick={handleSaveReservation}>Save</button>
                  <button onClick={() => setNewReservation(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
