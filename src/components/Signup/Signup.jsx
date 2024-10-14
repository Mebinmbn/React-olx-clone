import { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FireBaseContext } from "../../Contexts/Context";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { fireBase, auth } = useContext(FireBaseContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((response) => {
        const user = response.user;
        return updateProfile(user, {
          displayName: formData.userName,
        }).then(() => {
          return addDoc(collection(fireBase, "userCredentials"), {
            id: user.uid,
            userName: formData.userName,
            phone: formData.phone,
          });
        });
      })
      .then(() => {
        alert("Signup Successful");
        navigate("/login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        alert(`Signup failed: ${errorMessage}`);
        navigate("/signUp");
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
          Login
        </a>
      </div>
    </div>
  );
}
