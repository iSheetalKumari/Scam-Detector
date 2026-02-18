import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  // Fake History Data (Later we will connect Firebase)
  const [history] = useState([
    {
      id: 1,
      message: "Your bank account will be blocked. Share OTP now!",
      type: "OTP Fraud",
      probability: 92,
      date: "2026-02-16",
    },
    {
      id: 2,
      message: "Congratulations! You won ₹10,000 cashback. Click link.",
      type: "UPI Scam",
      probability: 87,
      date: "2026-02-15",
    },
    {
      id: 3,
      message: "Amazon delivery pending. Pay customs fee immediately.",
      type: "Courier Scam",
      probability: 78,
      date: "2026-02-14",
    },
    {
      id: 4,
      message: "Hello, this is your friend. Send me ₹2000 urgently.",
      type: "Social Scam",
      probability: 65,
      date: "2026-02-13",
    },
  ]);

  // Stats Calculation
  const totalChecks = history.length;
  const highRisk = history.filter((item) => item.probability >= 80).length;
  const safeMessages = history.filter((item) => item.probability < 50).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">
          Dashboard
        </h1>

        <p className="text-gray-600 mb-8">
          Welcome back,{" "}
          <span className="font-semibold text-gray-800">
            {user?.email}
          </span>
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
            <h2 className="text-lg font-semibold text-gray-600">
              Total Checks
            </h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {totalChecks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-600">
            <h2 className="text-lg font-semibold text-gray-600">
              High Risk Scams
            </h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {highRisk}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600">
            <h2 className="text-lg font-semibold text-gray-600">
              Safe Messages
            </h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {safeMessages}
            </p>
          </div>
        </div>

        {/* Detection History */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recent Scam Detection History
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Message</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Risk %</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 text-gray-600">{item.date}</td>

                    <td className="p-3 text-gray-800 max-w-sm truncate">
                      {item.message}
                    </td>

                    <td className="p-3 font-semibold text-blue-700">
                      {item.type}
                    </td>

                    <td
                      className={`p-3 font-bold ${
                        item.probability >= 80
                          ? "text-red-600"
                          : item.probability >= 50
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {item.probability}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Extra Note */}
          <p className="text-gray-500 mt-4 text-sm">
             Next step: We will store this history automatically using Firebase Firestore.
          </p>
        </div>
      </div>
    </div>
  );
}
