import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={styles.nav}>
      <h3 style={{ margin: 0 }}>Seat Booking System</h3>
      <div>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/admin" style={styles.link}>Admin</Link>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#1e293b",
    color: "white"
  },
  link: {
    marginLeft: "20px",
    color: "white",
    textDecoration: "none",
    fontWeight: "500"
  }
};

export default Navbar;