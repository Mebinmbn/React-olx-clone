import { useState } from "react";
import Logo from "../../olx-logo.png";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    navigate("/signUp");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth(); // Correctly get the auth instance
    signInWithEmailAndPassword(auth, userName, password)
      .then((response) => {
        console.log("Login successful:", response);
        navigate("/"); // Navigate to the homepage or any other route
      })
      .catch((err) => {
        console.log("Login error:", err);
        alert(err);
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <a onClick={handleLoginClick} style={{ cursor: "pointer" }}>
          Signup
        </a>
      </div>
    </div>
  );
}

export default Login;
