import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-center py-4 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} AI Scam Detector | Made for Society Safety 
      </p>
    </footer>
  );
}

export default Footer;
