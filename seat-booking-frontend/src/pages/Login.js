import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [batch, setBatch] = useState("1");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/users/login", {
        email,
        batch
      });

      // Save full user object (with id) to localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      navigate("/dashboard");

    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2>Seat Booking Login</h2>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <select
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          style={styles.input}
        >
          <option value="1">Batch 1</option>
          <option value="2">Batch 2</option>
        </select>

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9"
  },
  form: {
    background: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    width: "300px"
  },
  input: {
    marginBottom: "15px",
    padding: "10px"
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default Login;