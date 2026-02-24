import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SeatGrid from "../components/SeatGrid";

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState("");
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleBookingSuccess = (booking) => {
    setBookings([...bookings, { ...booking, isLeave: false }]);
  };

  const markLeave = (index) => {
    const updated = [...bookings];
    updated[index].isLeave = true;
    setBookings(updated);
  };

  const cancelBooking = (index) => {
    setBookings(bookings.filter((_, i) => i !== index));
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.container}>

          {/* Booking Section */}
          <div style={styles.card}>
            <h3>Book Your Seat</h3>

            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={styles.dateInput}
            />
          </div>

          {selectedDate && (
            <div style={styles.card}>
              <SeatGrid
                selectedDate={selectedDate}
                isOutsideSchedule={false}
                onBookingSuccess={handleBookingSuccess}
              />
            </div>
          )}

          {/* My Bookings */}
          {bookings.length > 0 && (
            <div style={styles.card}>
              <h3>My Bookings</h3>

              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Seat</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, index) => (
                    <tr key={index}>
                      <td>{b.date}</td>
                      <td>{b.seatNumber}</td>
                      <td>{b.type}</td>
                      <td>
                        {b.isLeave ? (
                          <span style={{ color: "red" }}>On Leave</span>
                        ) : (
                          <span style={{ color: "green" }}>Booked</span>
                        )}
                      </td>
                      <td>
                        {!b.isLeave && (
                          <button
                            style={styles.leaveBtn}
                            onClick={() => markLeave(index)}
                          >
                            Leave
                          </button>
                        )}

                        <button
                          style={styles.cancelBtn}
                          onClick={() => cancelBooking(index)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    backgroundColor: "#f1f5f9",
    minHeight: "100vh",
    paddingTop: "30px"
  },

  container: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "20px"
  },

  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    marginBottom: "25px"
  },

  dateInput: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    marginTop: "10px"
  },

  table: {
    width: "100%",
    marginTop: "15px",
    borderCollapse: "collapse"
  },

  leaveBtn: {
    padding: "6px 12px",
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginRight: "10px",
    cursor: "pointer"
  },

  cancelBtn: {
    padding: "6px 12px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Dashboard;