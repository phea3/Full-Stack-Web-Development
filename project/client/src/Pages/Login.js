import axios from "axios";
import React, { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const showNotification = (title, message) => {
    NotificationManager.success(message, title);
  };

  const showFailNotification = (title, message) => {
    NotificationManager.error(message, title, 5000);
  };

  const login = () => {
    const data = { username: username, password: password };
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((res) => {
        showNotification("Success", res?.data);
      })
      .catch((error) => {
        showFailNotification("Fail", error?.response?.data?.error);
      });
  };

  return (
    <div className="loginContainer">
      <NotificationContainer />
      <label>Username:</label>
      <input
        text="text"
        onChange={(e) => {
          setUsername(e?.target?.value);
        }}
      />
      <label>Password:</label>
      <input
        text="password"
        onChange={(e) => {
          setPassword(e?.target?.value);
        }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
