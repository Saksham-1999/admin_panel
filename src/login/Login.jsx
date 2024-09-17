// src/pages/login/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";
import styles from "./Login.module.css";
import email_icon from "./../assets/email1.png";
import password_icon from "./../assets/password.png";
import leftImage from "./../assets/loginPlane.jpg";
import { IoChevronBackCircle } from "react-icons/io5";
import { toast } from "react-toastify";

const Login = () => {
  const [action, setAction] = useState("Login");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&])(?=.*[0-9]).{2,}$/;
    // return passwordRegex.test(password);
    return password;
  };

  const handleLogin = async () => {
    setError("");
    // User ID and password validation
    if (!userId.trim() || !password.trim()) {
      setError("Please enter both User ID and Password.");
      toast.error("Please enter both User ID and Password.");
      return;
    }

    // Email validation
    if (!validateEmail(userId)) {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one special character."
      );
      toast.error(
        "Password must be at least 8 characters long and contain at least one special character."
      );
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email: userId, password: password }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
        toast.error("Invalid user ID or password");
      }

      const data = await response.json();
      console.log(data);
      if (data.token) {
        login(data.token);
        localStorage.setItem("userId", data?.user?.id);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        setError("Invalid user ID or password");
        toast.error("Invalid user ID or password");
      }
    } catch (error) {
      setError("Error logging in: " + error.message);
      toast.error("Error logging in: " + error.message);
    }
  };

  const handleSendPasswordReset = async () => {
    setError("");

    // Email validation for forgot password
    if (!validateEmail(userId)) {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    } else {
      try {
        // const token = localStorage.getItem('token');
        const response = await fetch(
          "http://127.0.0.1:8000/password-reset-request/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Authorization':`Token ${token}`
            },
            body: JSON.stringify({ email: userId }),
          }
        );

        const data = await response.json();
        console.log("change password response", data);
        if (data.success) {
          toast.success("Password reset link sent to your email");
        } else {
          toast.error("Failed to send password reset link");
        }
        setAction("Login");
      } catch (error) {
        toast.error("Error sending password reset link: " + error.message);
      }

      // Call your API to send the password reset link
      console.log("Password reset link sent to:", userId);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.imageContainer}>
        <img src={leftImage} alt="Left" style={{ objectFit: "cover" }} />
      </div>
      <div className={styles.container}>
        {action === "Login" ? null : (
          <IoChevronBackCircle
            className={styles.backButton}
            onClick={() => {
              setAction("Login");
              setError("");
            }}
          />
        )}
        <div className={styles.header}>
          <div className={styles.text}>{action}</div>
          <div className={styles.underline}></div>
        </div>
        <div className={styles.inputs}>
          <div className={styles.input}>
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="User email"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          {action === "Forget Password" ? null : (
            <div className={styles.input}>
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
        </div>
        {error && <div className={styles.error}>{error}</div>}
        {action === "Forget Password" ? null : (
          <div className={styles.forgetPassword}>
            Forgot Password?{" "}
            <span
              onClick={() => {
                setAction("Forget Password");
                setError("");
              }}
            >
              Click here!
            </span>
          </div>
        )}
        <div className={styles.submitContainer}>
          {action === "Forget Password" ? (
            <div className={styles.submit} onClick={handleSendPasswordReset}>
              Send
            </div>
          ) : (
            <div className={styles.submit} onClick={handleLogin}>
              Login
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
