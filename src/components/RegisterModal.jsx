import React, { useState } from "react";
import FloatingInput from "./FloatingInput";
import "../styles/Authorization.scss";

const RegisterModal = ({ onClose, onSwitch, onSuccess }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const validateEmail = (val) => /\S+@\S+\.\S+/.test(val);
  const validatePhone = (val) => /^(\d{2} \d{7}|\d{4} \d{3} \d{4})$/.test(val);
  const validatePassword = (val) =>
    val.length >= 8 && /\d/.test(val) && /[A-Z]/.test(val);

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length === 9) {
      val = val.replace(/(\d{2})(\d{7})/, "$1 $2");
    } else if (val.length === 11) {
      val = val.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3");
    }
    setPhone(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name &&
      validateEmail(email) &&
      validatePhone(phone) &&
      validatePassword(password) &&
      password === confirm
    ) {
      onSuccess(name);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content register-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Create Your Account</h2>

        <form onSubmit={handleSubmit}>
          <FloatingInput
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            validator={(val) => val.length > 2}
            errorMessage="Name too short"
          />

          <FloatingInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            validator={validateEmail}
            errorMessage="Invalid email"
          />

          <FloatingInput
            label="Phone"
            value={phone}
            onChange={handlePhoneChange}
            validator={validatePhone}
            errorMessage="Invalid phone format"
          />

          <FloatingInput
            label="Password"
            type="password"
            isPassword
            showPasswordToggle
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            validator={validatePassword}
            errorMessage="Must be 8+ chars, include number & uppercase"
          />

          <FloatingInput
            label="Confirm Password"
            type="password"
            isPassword
            showPasswordToggle
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            validator={(val) => val === password}
            errorMessage="Passwords do not match"
          />

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account?{" "}
          <span className="link" onClick={onSwitch}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
