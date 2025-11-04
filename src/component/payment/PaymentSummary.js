import React from "react";

const PaymentSummary = ({ booking }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booking Summary</h2>

      <div className="space-y-2 text-gray-700">
        <p><strong>Hotel:</strong> {booking.hotelName}</p>
        <p><strong>Room Type:</strong> {booking.roomType}</p>
        <p><strong>Guests:</strong> {booking.guests}</p>
        <p><strong>Check-in:</strong> {booking.checkIn}</p>
        <p><strong>Check-out:</strong> {booking.checkOut}</p>
      </div>

      <div className="border-t mt-4 pt-4 flex justify-between text-lg font-medium">
        <span>Total</span>
        <span>₹{booking.price}</span>
      </div>
    </div>
  );
};

export default PaymentSummary;
