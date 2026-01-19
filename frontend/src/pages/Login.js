import { useState } from "react";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);

      // store token
      localStorage.setItem("token", data.token);

      setMessage("Login successful!");
      console.log("Logged in user:", data.user);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <button
        onClick={handleLogin}
        style={{ width: "100%", padding: "10px" }}
      >
        Login
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
