export default function TipsPage() {
  const tips = [
    "Never share OTP, CVV, ATM PIN with anyone.",
    "Do not click unknown WhatsApp/Instagram links.",
    "Always verify customer care numbers from official websites.",
    "UPI payments cannot be 'received' by entering PIN.",
    "If someone threatens you on call, disconnect immediately.",
    "Report scams to Cyber Crime Portal: cybercrime.gov.in",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Scam Safety Tips
        </h1>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <ul className="space-y-4 text-gray-700 text-lg">
            {tips.map((tip, index) => (
              <li
                key={index}
                className="flex gap-3 items-start bg-gray-50 p-4 rounded-lg border"
              >
                <span className="text-blue-600 font-bold">✔</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
