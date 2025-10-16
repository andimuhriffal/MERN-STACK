import React from 'react';

const ErrorMessage = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="error-message">
      <span>{error}</span>
      <button onClick={onClose} className="close-btn">×</button>
    </div>
  );
};

export default ErrorMessage;