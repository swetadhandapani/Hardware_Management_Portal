import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('https://png.pngtree.com/png-clipart/20230223/ourmid/pngtree-apple-laptop-transparent-background-png-image_6615786.png')`,
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        color: "white",
        textAlign: "center",
      }}
    >
  
      <div
        style={{
          padding: "20px", 
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "16px", 
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
          zIndex: 2, 
        }}
      >
        <h1 style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", color: "black", fontWeight: "bold" }}>
          FixIT Hub
        </h1>
        <p 
          style={{ 
            color: "black", 
            fontSize: "18px", 
            fontWeight: "normal", 
            marginTop: "10px", 
            maxWidth: "600px", 
            lineHeight: "1.6", 
            textAlign: "center", 
            margin: "0 auto",
          }}
        >
          Connect users with professional hardware repair services, providing quick and reliable fixes for various electronic devices.
        </p>
        <div style={{ marginTop: "20px" }}>
          <span style={{ 
            fontSize: "16px", 
            color: "#00bcd4", 
            cursor: "pointer"
          }}>
            Click here to{" "}
            <Link to="/register" style={{ color: "#00bcd4", textDecoration: "underline" }}>
              Register
            </Link>{" "}
            or{" "}
            <Link to="/login" style={{ color: "#00bcd4", textDecoration: "underline" }}>
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
