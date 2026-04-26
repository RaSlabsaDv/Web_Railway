import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BookingProvider } from "./context/BookingContext";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <ToastContainer position="top-right" theme="colored" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:trainId" element={<Booking />} />
        </Routes>
      </BookingProvider>
    </BrowserRouter>
  );
}
