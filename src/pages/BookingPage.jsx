import React from "react";
import MultiStepForm from "../components/MultiStepForm";

export default function BookingPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center  bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Vehicle Booking Form
        </h1>
        <MultiStepForm />
      </div>
    </div>
  );
}
