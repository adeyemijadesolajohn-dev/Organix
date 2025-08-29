import React, { useState } from "react";
import FloatingInput from "./FloatingInput";
import "../styles/Authorization.scss";

const LoginModal = ({ onClose, onSwitch, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (val) => /\S+@\S+\.\S+/.test(val);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email) && password) {
      onSuccess("User");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content login-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <FloatingInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            validator={validateEmail}
            errorMessage="Invalid email format"
          />
          <FloatingInput
            label="Password"
            type="password"
            isPassword
            showPasswordToggle
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            validator={(val) => val.length >= 6}
            errorMessage="Password must be at least 6 characters"
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don’t have an account?{" "}
          <span className="link" onClick={onSwitch}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
