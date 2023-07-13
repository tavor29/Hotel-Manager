import "../../styles/Dash+SchedStyle.css";
import React from "react";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Simulate fetching bookings data
    const data = generateFakeBookings();
    setBookings(data);
  }, []);

  const generateFakeBookings = () => {
    const bookings = [];
    const today = new Date();

    for (let i = 1; i <= 30; i++) {
      const checkInDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - Math.floor(Math.random() * 30)
      );
      const checkOutDate = new Date(
        checkInDate.getFullYear(),
        checkInDate.getMonth(),
        checkInDate.getDate() + Math.floor(Math.random() * 15) + 1
      );

      const booking = {
        id: i,
        guestName: `Guest ${i}`,
        roomNumber: Math.floor(Math.random() * 80) + 1,
        checkInDate: formatDate(checkInDate),
        checkOutDate: formatDate(checkOutDate),
      };

      bookings.push(booking);
    }

    return bookings;
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const generateChartData = () => {
    const roomNumbers = [];
    const bookingsCount = [];

    bookings.forEach((booking) => {
      if (!roomNumbers.includes(booking.roomNumber)) {
        roomNumbers.push(booking.roomNumber);
        const exaggeratedCount = Math.floor(Math.random() * 50) + 1; // Generate random exaggerated count between 1 and 50
        bookingsCount.push(exaggeratedCount);
      } else {
        const index = roomNumbers.indexOf(booking.roomNumber);
        const existingCount = bookingsCount[index];
        const exaggeratedCount =
          existingCount + Math.floor(Math.random() * 10) + 1; // Increase the existing count by a random exaggerated value between 1 and 10
        bookingsCount[index] = exaggeratedCount;
      }
    });

    const data = roomNumbers.map((roomNumber, index) => ({
      roomNumber: roomNumber.toString(),
      count: bookingsCount[index],
    }));

    return data;
  };

  const generatePieChartData = () => {
    const guestNames = bookings.map((booking) => booking.guestName);
    const uniqueGuestNames = [...new Set(guestNames)];

    const data = uniqueGuestNames.map((guestName) => {
      const totalHours = bookings
        .filter((booking) => booking.guestName === guestName)
        .reduce((acc, booking) => {
          const checkInDate = new Date(booking.checkInDate);
          const checkOutDate = new Date(booking.checkOutDate);
          const hours = Math.abs(checkOutDate - checkInDate) / 36e5; // Calculate total hours of stay
          return acc + hours;
        }, 0);

      return {
        guestName,
        totalHours,
      };
    });

    return data;
  };

  const generateLineChartData = () => {
    const bookingDates = bookings.map((booking) => booking.checkInDate);
    const uniqueBookingDates = [...new Set(bookingDates)];

    const data = uniqueBookingDates.map((date) => {
      const count = bookingDates.filter(
        (bookingDate) => bookingDate === date
      ).length;
      return {
        date: formatDate(new Date(date)),
        count,
      };
    });

    return data;
  };

  return (
    <>
      <div className="container">
        <h1 className="header1">Hotel Manager Dashboard</h1>
        <div className="Dashboard">
          <div className="ChartsContainer">
            <div className="Chart">
              <h2>Number of Room Bookings</h2>
              <BarChart width={500} height={300} data={generateChartData()}>
                <XAxis dataKey="roomNumber" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#b48c7a" />
              </BarChart>
            </div>
            <div className="Chart">
              <h2>Guest's Total Stay (hours)</h2>
              <PieChart width={500} height={300}>
                <Pie
                  data={generatePieChartData()}
                  dataKey="totalHours"
                  nameKey="guestName"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  fill="#d1bfa6"
                />
                <Tooltip />
                <Legend iconSize={0.1} verticalAlign="bottom" height={120} />
              </PieChart>
            </div>

            <div className="Chart">
              <h2>Booking Trends</h2>
              <ResponsiveContainer width="90%" height={300}>
                <LineChart data={generateLineChartData()}>
                  <Line type="monotone" dataKey="count" stroke="#b48c7a" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest Name</th>
                <th>Room Number</th>
                <th>Check-in Date</th>
                <th>Check-out Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.guestName}</td>
                  <td>{booking.roomNumber}</td>
                  <td>{booking.checkInDate}</td>
                  <td>{booking.checkOutDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
