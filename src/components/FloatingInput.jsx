import React, { useState, useEffect } from "react";
import "../styles/Authorization.scss";

const FloatingInput = ({
  label,
  type = "text",
  value,
  onChange,
  validator,
  errorMessage,
  maxLength,
  isPassword,
  showPasswordToggle,
  options,
}) => {
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (validator) {
      setError(validator(value) ? "" : errorMessage);
    }
  }, [value, validator, errorMessage]);

  const handleBlur = () => {
    setFocused(false);
    if (validator && !validator(value)) {
      setError(errorMessage);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`floating-input ${error ? "error" : ""}`}>
      {options ? (
        <select
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
        >
          <option value=""></option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={showPassword && isPassword ? "text" : type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          maxLength={maxLength}
        />
      )}

      <label
        className={
          focused || value ? "floating-label floated" : "floating-label"
        }
      >
        {label}
      </label>

      {isPassword && showPasswordToggle && (
        <span
          className="toggle-password"
          onClick={() => setShowPassword((p) => !p)}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      )}

      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default FloatingInput;
