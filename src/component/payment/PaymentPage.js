import React, { useEffect } from "react";
import axios from "axios";

const PaymentPage = () => {
  const handlePayment = async () => {
    try {
      // 1️⃣ Call backend to create a Razorpay order
      const response = await axios.post("http://localhost:8080/api/payment/create-order", {
        amount: 50000, // Rs. 500
        currency: "INR",
        receipt: "receipt#1",
      });

      const { amount, id: order_id, currency } = response.data;

      // 2️⃣ Setup Razorpay options
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace this with your Razorpay Key ID
        amount: amount.toString(),
        currency: currency,
        name: "Snap Travel Hotel",
        description: "Hotel booking payment",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          // 3️⃣ Verify payment
          const result = await axios.post("http://localhost:8080/api/payment/verify", data);
          alert(result.data.status === "success" ? "Payment Successful!" : "Payment Failed!");
        },
        prefill: {
          name: "Suman Majee",
          email: "suman@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 4️⃣ Open Razorpay Checkout
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment initiation failed. Check console for details.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Make Payment</h2>
      <button
        onClick={handlePayment}
        style={{
          backgroundColor: "#3399cc",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Pay ₹500
      </button>
    </div>
  );
};

export default PaymentPage;
