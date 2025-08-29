import React from "react";
import "../styles/Authorization.scss";

const SuccessModal = ({ name, onClose }) => {
  return (
    <div className="modal-overlay success-overlay" onClick={onClose}>
      <div
        className="modal-content success-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="checkmark-animation">
          <svg viewBox="0 0 52 52">
            <path d="M14 27 l7 7 l17 -17" />
          </svg>
        </div>
        <h2>Successful Login</h2>
        <p>Welcome to Organix, {name}!</p>
      </div>
    </div>
  );
};

export default SuccessModal;
