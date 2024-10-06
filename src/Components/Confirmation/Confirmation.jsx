// src/Components/Confirmation/Confirmation.jsx
import React from 'react';

export default function Confirmation() {
  return (
    <div className="confirmation-container">
      <h1 className="confirmation-header">Congratulations on Your Booking!</h1>
      <p className="confirmation-message">The nurse will reach you shortly.</p>

      <style jsx>{`
        .confirmation-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f4f2de; /* Light background color */
          color: #4a4a4a; /* Dark text color */
          animation: fadeIn 1s ease-in-out;
        }

        .confirmation-header {
          font-size: 2.5rem;
          color: #28a745; /* Green color for success */
          margin-bottom: 1rem;
          animation: bounce 1.5s infinite;
        }

        .confirmation-message {
          font-size: 1.5rem;
          text-align: center;
        }

        /* Keyframes for animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}
