import React, { useState } from "react";

const PaymentButton = ({ amount }) => {
  const [loading, setLoading] = useState(false);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Check your connection.");
      setLoading(false);
      return;
    }

    const orderResponse = await fetch("http://localhost:8080/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const orderData = await orderResponse.json();

    const options = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Snap Travel Hotel",
      description: "Room Booking Payment",
      order_id: orderData.id,
      handler: async function (response) {
        const verifyResponse = await fetch("http://localhost:8080/api/payment/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const verifyData = await verifyResponse.json();
        if (verifyData.success) {
          alert("✅ Payment successful and verified!");
        } else {
          alert("❌ Payment verification failed!");
        }
        setLoading(false);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#000000" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`w-full py-3 mt-6 rounded-lg text-white font-semibold transition 
      ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-black hover:bg-gray-900"}`}
    >
      {loading ? "Processing..." : `Pay ₹${amount}`}
    </button>
  );
};

export default PaymentButton;
