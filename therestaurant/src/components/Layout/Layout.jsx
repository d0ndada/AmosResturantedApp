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
  const [backgroundClass, setBackgroundClass] = useState("bg-default");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const preloadImages = () => {
    const imageList = [backgroundImage, bookingPageBackground, AdminBackground];
    imageList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  };

  preloadImages();

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
      setBackgroundClass("bg-booking");
    } else if (location.pathname === "/admin") {
      setBackgroundClass("bg-admin");
    } else if (location.pathname === "/Booking") {
      setBackgroundClass("bg-admin");
    } else {
      setBackgroundClass("bg-default");
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

  return (
    <BlockchainContext.Provider value={blockchain}>
      <div className={`layout-background-transition ${backgroundClass}`}>
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
