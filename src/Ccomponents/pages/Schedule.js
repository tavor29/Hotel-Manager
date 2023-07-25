import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/Dash+SchedStyle.css";

const localizer = momentLocalizer(moment);

const titleStyle = {
  width: "100%",
  textAlign: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontWeight: "bold",
};

const DailyView = ({ date, reservations }) => {
  const filteredReservations = reservations.filter((event) =>
    moment(event.start).isSame(date, "day")
  );

  // Define the style for the underlined event room
  const underlineStyle = {
    textDecoration: "underline",
    fontWeight: "bold",
  };

  return (
    <div>
      <h2>{moment(date).format("LL")}</h2>
      <ul>
        {filteredReservations.map((event) => (
          <li key={event.id}>
            <span style={underlineStyle}>Room: {event.room}</span>
            <br />
            Time: {moment(event.start).format("LT")} -{" "}
            {moment(event.end).format("LT")}
            <br />
            Therapist 1: {event.body.match(/Therapist 1: (\w+)/)[1]}
            <br />
            {event.body.match(/Therapist 2: (\w+)/) && (
              <div>
                Therapist 2: {event.body.match(/Therapist 2: (\w+)/)[1]}
                <br />
              </div>
            )}
            &nbsp;&nbsp;&nbsp;
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Schedule() {
  const [reservations, setReservations] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment().toDate());
  const [showDailyView, setShowDailyView] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(
        "https://proj.ruppin.ac.il/cgroup97/test2/api/GetSpaOrders?hotelID=1002"
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

      const start = moment(
        `${Date} ${StartTime}`,
        "YYYY-MM-DD HH:mm:ss"
      ).toDate();
      const end = moment(`${Date} ${EndTime}`, "YYYY-MM-DD HH:mm:ss").toDate();

      const title = `Room ${Room}`;
      const body = `\nRoom ${Room}\nTherapist 1: ${Therapy1Gender}\n${
        Therapy2Gender ? "Therapist 2: " + Therapy2Gender : ""
      }`;

      return {
        id: AppointmentID,
        title,
        start,
        end,
        room: Room,
        body,
      };
    });

    return reservations;
  };

  const eventStyleGetter = () => {
    const style = {
      backgroundColor: "#e6b576",
      borderColor: "#007bff",
      borderRadius: "5px",
      color: "#000",
      padding: "4px",
      height: "100%",
      overflow: "hidden",
      display: "flex",
      flex: 1,
    };
    return {
      style,
    };
  };

  const handleNavigateBack = () => {
    setShowDailyView(false);
  };

  const handleEventClick = (event) => {
    setCurrentDate(event.start);
    setShowDailyView(true);
  };

  return (
    <div className="container">
      <div>
        <div className="Schedule">
          <h1>Spa Reservations</h1>
          {!showDailyView ? (
            <div>
              <Calendar
                localizer={localizer}
                events={reservations}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                defaultView="month"
                views={{ month: true, week: true, day: true }}
                eventPropGetter={eventStyleGetter}
                tooltipAccessor="body"
                onSelectEvent={handleEventClick}
                step={60}
              />
            </div>
          ) : (
            <div>
              <button onClick={handleNavigateBack}>Back</button>
              <DailyView date={currentDate} reservations={reservations} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
