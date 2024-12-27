/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Layouts/AuthLayout";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      navigate(`/${storedUser.role}`);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; 
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
      const userData = response.data.user;

      if (userData) {
        setUser({
          id: userData._id,
          role: userData.role,
          email: userData.email,
        });

        localStorage.setItem("user", JSON.stringify(userData));
        alert("Login successful");

        // Role-based redirection
        if (userData.role === "admin") {
          navigate("/admin");
        } else if (userData.role === "employee") {
          navigate("/employee");
        } else {
          navigate("/user");
        }
      } else {
        setError("Login failed. No user data received.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email: emailForReset }
      );
      setResetMessage(
        "If this email is registered, a password reset link has been sent."
      );
      setEmailForReset("");
    } catch (error) {
      setResetMessage("Error sending password reset link. Please try again.");
      console.error("Error sending reset link:", error);
    }
  };

  return (
    <AuthLayout>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={credentials.email}
          placeholder="Email"
          required
          style={styles.input}
        />
        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            value={credentials.password}
            placeholder="Password"
            required
            style={styles.inputWithIcon}
          />
          <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit" style={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>

      <button
        onClick={() => setIsForgotPassword(true)}
        style={styles.forgotPassword}
      >
        Forgot password?
      </button>

      {isForgotPassword && (
        <div style={styles.forgotPasswordContainer}>
          <span
            style={styles.cancelButton}
            onClick={() => setIsForgotPassword(false)}
          >
            &times;
          </span>
          <h3 style={styles.forgotPasswordTitle}>Reset Password</h3>
          <form
            onSubmit={handleForgotPassword}
            style={styles.forgotPasswordForm}
          >
            <input
              type="email"
              onChange={(e) => setEmailForReset(e.target.value)}
              value={emailForReset}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Send Reset Link
            </button>
          </form>
          {resetMessage && <p style={styles.resetMessage}>{resetMessage}</p>}
        </div>
      )}
    </AuthLayout>
  );
};

// Styles
const styles = {
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  passwordContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    marginBottom: "10px",
  },
  inputWithIcon: {
    padding: "10px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    paddingRight: "30px", 
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    color: "#333",
    fontSize: "20px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    margin: "10px 0",
  },
  forgotPassword: {
    marginTop: "10px",
    color: "#007BFF",
    background: "none",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer",
  },
  forgotPasswordContainer: {
    position: "relative",
    marginTop: "20px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  forgotPasswordTitle: {
    marginBottom: "10px",
  },
  forgotPasswordForm: {
    display: "flex",
    flexDirection: "column",
  },
  resetMessage: {
    marginTop: "10px",
    color: "green",
  },
  cancelButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "24px",
    cursor: "pointer",
    color: "red",
  },
};

export default Login;
