
import React from 'react';
import { Link } from 'react-router-dom';

function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 text-white p-6">
      <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-md text-center">
        <div className="mb-6">
          <h2 className="text-6xl text-green-500 font-bold">✔️</h2>
        </div>
        <h1 className="text-3xl font-semibold text-amber-900 mb-4">Thank You for Your Booking!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Your booking has been successfully processed. We look forward to serving you and hope you have an amazing experience!
        </p>
        <div>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white font-semibold text-lg py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
