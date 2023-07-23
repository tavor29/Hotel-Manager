import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/Dash+SchedStyle.css";

const localizer = momentLocalizer(moment);

export default function Schedule() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(
        "http://proj.ruppin.ac.il/cgroup97/test2/api/GetSpaOrders?hotelID=1002"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const convertedReservations = convertToReservations(data);
      setReservations(convertedReservations);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const convertToReservations = (data) => {
    const reservations = data.map((appointment) => {
      const {
        AppointmentID,
        Date,
        StartTime,
        EndTime,
        Therapy1Gender,
        Therapy2Gender,
        Room,
      } = appointment;

      // Use moment to parse the date and time strings
      const start = moment(`${Date} ${StartTime}`, "YYYY-MM-DD HH:mm:ss").toDate();
      const end = moment(`${Date} ${EndTime}`, "YYYY-MM-DD HH:mm:ss").toDate();

      const title = `Room ${Room}`;
      const body = `\nRoom ${Room}\nTherapist 1: ${Therapy1Gender}\n${Therapy2Gender ? "Therapist 2: " + Therapy2Gender : ""}`;

      return {
        id: AppointmentID,
        title,
        start,
        end,
        body,
      };
    });

    return reservations;
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.id % 2 === 0 ? "#e6b576" : "#e6cba9";
    const borderColor = event.id % 2 === 0 ? "#007bff" : "#007bff";
    const style = {
      backgroundColor,
      borderColor,
      borderRadius: "5px",
      color: "#000",
      padding: "4px",
      height: "100%",
      overflow: "hidden",
      display:"flex",
      flex:1,
    };
    return {
      style,
    };
  };

  return (
    <div className="container">
      <div>
        <div className="Schedule">
          <h1>Spa Reservations</h1>
          <Calendar
            localizer={localizer}
            events={reservations}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            defaultView="month"
            views={{ month: true, week: true, day: true }}
            components={{
              event: EventComponent,
            }}
            eventPropGetter={eventStyleGetter}
            doShowMoreDrillDown={true}
            tooltipAccessor="body"
          />
        </div>
      </div>
    </div>
  );
}

const EventComponent = ({ event }) => {
  const backgroundColor = event.id % 2 === 0 ? "#e6b576" : "#e6cba9";
  const borderColor = event.id % 2 === 0 ? "#007bff" : "#007bff";
  const style = {
    backgroundColor,
    borderColor,
    borderRadius: "5px",
    color: "#000",
    padding: "4px",
    height: "100%",
    overflow: "hidden",
  };

  const titleStyle = {
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: "bold",
  };

  return (
    <div style={style}>
      <div style={titleStyle}>{event.title}</div>
    </div>
  );
};
