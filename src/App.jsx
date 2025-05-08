import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookingPage from "./pages/BookingPage";
import ThankYou from "./pages/Thankyou";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        {/* <Route path="/thank-you" element={<div className="text-center text-2xl mt-20">Thank you for your booking!</div>} /> */}
        <Route path="/thank-you" element={<ThankYou/>} />
      </Routes>
    </Router>
  );
}

export default App;
