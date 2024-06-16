import React, { useState } from 'react';
import './VerificationPopup.css'; // Define the styles for the verification popup

const VerificationPopup = ({ onClose, onVerify }) => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onVerify function with the entered verification code
    onVerify(verificationCode);
  };

  return (
    <div className="verification-popup">
      <div className="verification-popup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Enter Verification Code</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={verificationCode}
            onChange={handleChange}
            placeholder="Enter verification code"
            required
          />
          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default VerificationPopup;
