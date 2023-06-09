import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Layout.css";
import Navbar from "../navbar/navbar";
import useBlockchain from "../../useContext/useBlockchain";
import BlockchainContext from "../../BlockchainContext";
import RoutesComponent from "../Routes/Routes";
import backgroundImage from "../../Images/mat-turkiskt.jpg";
import bookingPageBackground from "../../Images/booking.jpg";
import AdminBackground from "../../Images/Admin.jpg";

export const Layout = () => {
  const blockchain = useBlockchain();
  const { admin, setAdmin } = blockchain;
  const [loggedIn, setLoggedIn] = useState(false);
  const [backgroundImageState, setBackgroundImageState] =
    useState(backgroundImage);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername === "Admin" && savedPassword === "Admin") {
      setLoggedIn(true);
      setAdmin(true);

      if (location.pathname !== "/Booking") {
        navigate("/Booking");
      }
    }
  }, [navigate, location]);
  useEffect(() => {
    if (location.pathname === "/booking") {
      setBackgroundImageState(bookingPageBackground);
    } else if (location.pathname === "/admin") {
      setBackgroundImageState(AdminBackground);
    } else if (location.pathname === "/Booking") {
      setBackgroundImageState(AdminBackground);
    } else {
      setBackgroundImageState(backgroundImage);
    }
  }, [location.pathname]);
  const handleLogin = (username, password) => {
    if (username === "Admin" && password === "Admin") {
      console.log("Logged in successfully!");
      setAdmin(true);
      console.log(admin);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      setLoggedIn(true);
      navigate("/Booking");
    } else {
      console.log("Ogiltigt användarnamn eller lösenord!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    setLoggedIn(false);
    setAdmin(false);
    navigate("/");
  };

  const layoutStyle = {
    backgroundImage: `url(${backgroundImageState})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  };

  return (
    <BlockchainContext.Provider value={blockchain}>
      <div style={layoutStyle}>
        <header>
          <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
        </header>
        <main>
          <RoutesComponent
            loggedIn={loggedIn}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        </main>
      </div>
    </BlockchainContext.Provider>
  );
};
