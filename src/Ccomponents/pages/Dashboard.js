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
        checkInDate.getDate() + Math.floor(Math.random() * 10) + 1
      );

      const booking = {
        id: i,
        guestName: `Guest ${i}`,
        roomNumber: Math.floor(Math.random() * 100) + 1,
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
        bookingsCount.push(1);
      } else {
        const index = roomNumbers.indexOf(booking.roomNumber);
        bookingsCount[index]++;
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
    const bookingCount = bookings.length;

    const data = uniqueGuestNames.map((guestName) => {
      const count = guestNames.filter((name) => name === guestName).length;
      const percentage = ((count / bookingCount) * 100).toFixed(2);
      return {
        guestName,
        percentage,
      };
    });

    return data;
  };

  return (
    <>
      <h1 className="header1">Hotel Manager Dashboard</h1>
      <div className="container">
        <div className="Dashboard">
          <div className="ChartsContainer">
            <div className="Chart">
              <h2>Room Bookings</h2>
              <BarChart width={500} height={300} data={generateChartData()}>
                <XAxis dataKey="roomNumber" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </div>
            <div className="Chart">
              <h2>Guests</h2>
              <PieChart width={500} height={300}>
                <Pie
                  data={generatePieChartData()}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
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
