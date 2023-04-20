import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/Home";
import BookingPage from "../pages/BookingPage/BookingPage";
import Contact from "../pages/Contact/Contact";
import Admin from "../Admin/Admin";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Booking" element={<BookingPage />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Admin" element={<Admin />}  />
    </Routes>
  );
};

export default RoutesComponent;
