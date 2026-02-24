import { useState } from "react";
import API from "../services/api";

function SeatGrid({ selectedDate, isOutsideSchedule, onBookingSuccess }) {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const now = new Date();
  const isAfter3PM = now.getHours() >= 15;

  // Generate seats
  const seats = Array.from({ length: 50 }, (_, i) => {
    const seatNumber = i + 1;
    let type = "REGULAR";
    if (seatNumber > 40) type = "FLOAT";
    return { seatNumber, type };
  });

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat.seatNumber);
  };

  const handleBooking = async () => {
    if (!selectedSeat) {
      alert("Please select a seat");
      return;
    }

    if (!user || !user.id) {
      alert("User not found. Please login again.");
      return;
    }

    try {
      await API.post("/bookings", {
        seatNumber: selectedSeat,
        date: selectedDate,
        type: selectedSeat > 40 ? "FLOAT" : "REGULAR",
        isLeave: false,
        user: { id: user.id }
      });

      alert("Seat booked successfully!");
      setSelectedSeat(null);

      if (onBookingSuccess) {
        onBookingSuccess();
      }

    } catch (error) {
      console.error("Booking Error:", error);
      alert("Booking failed");
    }
  };

  return (
    <div>
      <h3>Select Seat for {selectedDate}</h3>

      <div style={styles.legend}>
        <span style={{ color: "green" }}>■ Regular</span>
        <span style={{ color: "orange" }}>■ Float</span>
        <span style={{ color: "blue" }}>■ Selected</span>
        {!isOutsideSchedule && (
          <span style={{ color: "#dc2626" }}>
            (Float not allowed on your scheduled day)
          </span>
        )}
        {isOutsideSchedule && !isAfter3PM && (
          <span style={{ color: "#dc2626" }}>
            (You can book float seats after 3PM only)
          </span>
        )}
      </div>

      <div style={styles.grid}>
        {seats.map((seat) => {

          const isDisabled =
            // Apne day pe FLOAT disable
            (!isOutsideSchedule && seat.type === "FLOAT") ||

            // Apna day nahi hai
            (isOutsideSchedule && (
              seat.type === "REGULAR" ||   // Regular disabled
              !isAfter3PM                  // Float disabled before 3PM
            ));

          return (
            <div
              key={seat.seatNumber}
              style={{
                ...styles.seat,
                backgroundColor:
                  selectedSeat === seat.seatNumber
                    ? "blue"
                    : isDisabled
                    ? "#cbd5e1"
                    : seat.type === "FLOAT"
                    ? "orange"
                    : "green",
                cursor: isDisabled ? "not-allowed" : "pointer"
              }}
              onClick={() => !isDisabled && handleSeatClick(seat)}
            >
              {seat.seatNumber}
            </div>
          );
        })}
      </div>

      <button style={styles.button} onClick={handleBooking}>
        Book Seat
      </button>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    gap: "12px",
    marginTop: "20px"
  },
  seat: {
    padding: "18px",
    textAlign: "center",
    color: "white",
    borderRadius: "8px",
    fontWeight: "bold"
  },
  legend: {
    display: "flex",
    gap: "20px",
    marginBottom: "10px",
    flexWrap: "wrap"
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default SeatGrid;