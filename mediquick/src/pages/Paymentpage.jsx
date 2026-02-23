import React, { useContext, useState } from "react";
import { ERPContext } from "../context/ERPContext";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const { confirmedPharmacy } = useContext(ERPContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate a 2-second payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (!confirmedPharmacy) return <div className="p-10 text-center">No active order found.</div>;

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-blue-600 p-6 text-white text-center">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="opacity-80">Finalize your order for {confirmedPharmacy.name}</p>
      </div>

      <div className="p-8">
        {!isSuccess ? (
          <>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">Select Payment Method</label>
              <div className="space-y-3">
                {['gcash', 'card', 'cod'].map((method) => (
                  <div 
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === method ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${paymentMethod === method ? "border-blue-500" : "border-gray-300"}`}>
                      {paymentMethod === method && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                    </div>
                    <span className="capitalize font-medium">{method === 'cod' ? 'Cash on Delivery' : method}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${isProcessing ? "bg-gray-400" : "bg-green-600 hover:bg-green-700 active:scale-95"}`}
            >
              {isProcessing ? "Processing..." : `Pay with ${paymentMethod.toUpperCase()}`}
            </button>
            
            <button onClick={() => navigate("/order/medicines")} className="w-full mt-4 text-gray-500 text-sm font-medium">
              Back to Medicine Selection
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
            <p className="text-gray-500 mb-8">Your order has been sent to <br/><strong>{confirmedPharmacy.name}</strong></p>
            <button onClick={() => navigate("/")} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}