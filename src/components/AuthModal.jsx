import React, { useState, useEffect } from "react";
import { BiUserCircle, BiX, BiShow, BiHide } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import "../styles/AuthModal.scss";

const FloatingInput = ({
  label,
  type = "text",
  value,
  setValue,
  error,
  setError,
  validate,
  formatter,
  maxLength,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [tempChar, setTempChar] = useState("");

  useEffect(() => {
    if (tempChar) {
      const timer = setTimeout(() => setTempChar(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [tempChar]);

  const handleChange = (e) => {
    let val = e.target.value;
    if (formatter) val = formatter(val);
    setValue(val);
    if (validate) setError(!validate(val));
  };

  const togglePassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
      setTimeout(() => setShowPassword(false), 2000);
    }
  };

  return (
    <div className={`floatingInput ${error ? "error" : ""}`}>
      <input
        type={type === "password" && !showPassword ? "password" : "text"}
        value={tempChar || value}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          if (validate) setError(!validate(value));
        }}
        onChange={handleChange}
      />
      <label
        className={focused || value ? "float" : ""}
        style={{ color: error ? "red" : "" }}
      >
        {label}
      </label>
      {type === "password" && (
        <span className="togglePassword" onClick={togglePassword}>
          {showPassword ? (
            <BiHide style={{ display: "block" }} />
          ) : (
            <BiShow style={{ display: "block" }} />
          )}
        </span>
      )}
      {error && <p className="errorText">{`${label} is invalid`}</p>}
    </div>
  );
};

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [errors, setErrors] = useState({});

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const validatePhone = (val) => val.length === 11 + 2 || val.length === 9 + 1;

  const formatPhone = (val) => {
    val = val.replace(/\D/g, "");
    if (val.length <= 2) return val;
    if (val.length <= 9) return val.replace(/(\d{2})(\d{0,7})/, "$1 $2");
    return val.replace(/(\d{4})(\d{3})(\d{0,4})/, "$1 $2 $3");
  };

  const validatePassword = (val) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      val
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (mode === "login") {
      if (!validateEmail(email)) newErrors.email = true;
      if (!validatePassword(password)) newErrors.password = true;
    } else {
      if (!name.trim()) newErrors.name = true;
      if (!validateEmail(email)) newErrors.email = true;
      if (!validatePhone(phone)) newErrors.phone = true;
      if (!validatePassword(password)) newErrors.password = true;
      if (password !== confirm) newErrors.confirm = true;
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setMode("success");
      setTimeout(() => onClose(), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="authOverlay" onClick={onClose}>
      <div className="authModal" onClick={(e) => e.stopPropagation()}>
        {mode === "success" ? (
          <div className="successScreen">
            <div className="checkmark">&#10004;</div>
            <h2>Welcome to Organix, {name || "User"}!</h2>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>
              {mode === "login" ? "Login to Organix" : "Register at Organix"}
            </h2>

            {mode === "register" && (
              <FloatingInput
                label="Full Name"
                value={name}
                setValue={setName}
                error={errors.name}
                setError={(err) => setErrors({ ...errors, name: err })}
              />
            )}

            <FloatingInput
              label="Email"
              value={email}
              setValue={setEmail}
              error={errors.email}
              setError={(err) => setErrors({ ...errors, email: err })}
              validate={validateEmail}
            />

            {mode === "register" && (
              <FloatingInput
                label="Phone Number"
                value={phone}
                setValue={setPhone}
                error={errors.phone}
                setError={(err) => setErrors({ ...errors, phone: err })}
                validate={validatePhone}
                formatter={formatPhone}
              />
            )}

            <FloatingInput
              label="Password"
              type="password"
              value={password}
              setValue={setPassword}
              error={errors.password}
              setError={(err) => setErrors({ ...errors, password: err })}
              validate={validatePassword}
            />
            {mode === "register" && (
              <FloatingInput
                label="Confirm Password"
                type="password"
                value={confirm}
                setValue={setConfirm}
                error={errors.confirm}
                setError={(err) => setErrors({ ...errors, confirm: err })}
                validate={(val) => val === password}
              />
            )}

            <button type="submit" className="submitBtn">
              {mode === "login" ? "Login" : "Register"}
            </button>

            {mode === "login" ? (
              <p>
                Don’t have an account?{" "}
                <span className="link" onClick={() => setMode("register")}>
                  Register here
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span className="link" onClick={() => setMode("login")}>
                  Login here
                </span>
              </p>
            )}
          </form>
        )}
        <BiX className="closeBtn" onClick={onClose} />
      </div>
    </div>
  );
};

export default AuthModal;
