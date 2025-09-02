import React, { useState, useRef, useEffect, useCallback } from "react";
import { BiX, BiEnvelope, BiLockAlt, BiUser, BiPhone } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { ImLocation2 } from "react-icons/im";
import { FaGoogle, FaApple } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "react-lazy-load-image-component/src/effects/blur.css";
import { images } from "../Data/Images";
import "../styles/AuthModal.scss";

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const handleInputChange = useCallback((e, formType) => {
    const { name, value } = e.target;
    if (formType === "login") {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else {
      setRegisterData((prev) => {
        let newValue = value;
        if (name === "phoneNumber") {
          newValue = formatPhoneNumber(value);
        }
        return { ...prev, [name]: newValue };
      });
    }
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    const data = isLogin ? loginData : registerData;

    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email address is invalid.";
    }

    if (!data.password) {
      newErrors.password = "Password is required.";
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        data.password
      )
    ) {
      newErrors.password =
        "Password must contain an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    if (!isLogin) {
      if (!data.name.trim()) newErrors.name = "Name is required.";

      if (data.password !== data.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }

      const phoneDigits = data.phoneNumber.replace(/\s/g, "");
      if (phoneDigits && (phoneDigits.length < 9 || phoneDigits.length > 11)) {
        newErrors.phoneNumber = "Phone number must be 9 or 11 digits.";
      }
      if (!data.country) {
        newErrors.country = "Country is required.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [isLogin, loginData, registerData]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setIsSubmitted(true);
      if (validate()) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setIsSuccess(false);
          setLoginData({ email: "", password: "" });
          setRegisterData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            country: "",
          });
        }, 2000);
      }
    },
    [validate, onClose]
  );

  const formatPhoneNumber = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length <= 9) {
      return `${digitsOnly.substring(0, 2)} ${digitsOnly.substring(2, 9)}`;
    }
    if (digitsOnly.length <= 11) {
      return `${digitsOnly.substring(0, 4)} ${digitsOnly.substring(
        4,
        7
      )} ${digitsOnly.substring(7, 11)}`;
    }
    return digitsOnly.substring(0, 11);
  };

  const PasswordInput = ({
    value,
    onChange,
    name,
    label,
    show,
    toggleShow,
    error,
    icon,
    onFocus,
    onBlur,
    isFocused,
    formType,
  }) => {
    const [isTyping, setIsTyping] = useState(false);
    const [visibleGuides, setVisibleGuides] = useState([
      true,
      true,
      true,
      true,
      true,
    ]);
    const timers = useRef([null, null, null, null, null]);
    const inputRef = useRef(null);

    const isLengthValid = value.length >= 8 && value.length <= 20;
    const hasLowercase = /[a-z]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[@$!%*?&]/.test(value);

    const guides = [
      { text: "8-20 characters", valid: isLengthValid },
      { text: "1 lowercase letter", valid: hasLowercase },
      { text: "1 uppercase letter", valid: hasUppercase },
      { text: "1 number", valid: hasNumber },
      { text: "1 special character", valid: hasSpecialChar },
    ];

    useEffect(() => {
      let timeout;
      if (isTyping) {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
      return () => clearTimeout(timeout);
    }, [isTyping, value]);

    useEffect(() => {
      guides.forEach((guide, index) => {
        if (guide.valid) {
          if (visibleGuides[index] && !timers.current[index]) {
            timers.current[index] = setTimeout(() => {
              setVisibleGuides((prev) => {
                const newVisible = [...prev];
                newVisible[index] = false;
                return newVisible;
              });
              timers.current[index] = null;
            }, 2000);
          }
        } else {
          if (timers.current[index]) {
            clearTimeout(timers.current[index]);
            timers.current[index] = null;
          }
          if (!visibleGuides[index]) {
            setVisibleGuides((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        }
      });

      return () => {
        timers.current.forEach((timer) => {
          if (timer) clearTimeout(timer);
        });
      };
    }, [value, visibleGuides]);

    return (
      <div className={`inputGroup ${error ? "hasError" : ""}`}>
        <input
          id={name}
          name={name}
          type={show ? "text" : isTyping ? "text" : "password"}
          value={value}
          onChange={(e) => {
            onChange(e);
            setIsTyping(true);
          }}
          onFocus={() => {
            setIsTyping(true);
            onFocus();
          }}
          onBlur={() => {
            setIsTyping(false);
            onBlur();
            validate();
          }}
          className={value.trim() !== "" ? "hasContent" : ""}
          autoComplete="off"
          ref={inputRef}
        />

        <label htmlFor={name} className="floatingLabel">
          {label}
        </label>

        {icon && <div className="inputIcon">{icon}</div>}

        <span className="icon-wrapper" onClick={toggleShow}>
          {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>

        {isSubmitted && error && <span className="errorMessage">{error}</span>}

        {!isLogin && name === "password" && isFocused && (
          <div className="passwordGuide">
            <AnimatePresence>
              {guides.map((guide, index) =>
                visibleGuides[index] ? (
                  <motion.small
                    key={index}
                    className={
                      guide.valid ? "valid" : isSubmitted ? "invalid" : ""
                    }
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    {guide.valid && (
                      <motion.span
                        className="checkmark-icon"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        ✓
                      </motion.span>
                    )}

                    {guide.text}
                  </motion.small>
                ) : null
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  };

  const FormInput = ({
    name,
    label,
    value,
    onChange,
    formType,
    error,
    type = "text",
    icon,
  }) => {
    const inputRef = useRef(null);
    return (
      <div className={`inputGroup ${error ? "hasError" : ""}`}>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e, formType)}
          onBlur={validate}
          className={value.trim() !== "" ? "hasContent" : ""}
          autoComplete="off"
          ref={inputRef}
        />

        <label htmlFor={name} className="floatingLabel">
          {label}
        </label>

        {icon && <div className="inputIcon">{icon}</div>}

        {isSubmitted && error && <span className="errorMessage">{error}</span>}
      </div>
    );
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const renderContent = () => {
    if (isSuccess) {
      const name = registerData.name || loginData.email.split("@")[0];
      return (
        <motion.div
          key="success"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="successMessage"
        >
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />

            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>

          <h2 className="successTitle">Welcome, {name}!</h2>

          <p className="successText">Login successful.</p>
        </motion.div>
      );
    }

    return (
      <div className="authFormsContainer">
        <div className="authForm registerForm">
          <div className="modalHeader">
            <h2>Create an Account</h2>

            <p>
              Already have an account?{" "}
              <span
                className="link"
                onClick={() => setIsLogin(true)}
                role="button"
              >
                Login
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <FormInput
              name="name"
              label="Full Name"
              value={registerData.name}
              onChange={handleInputChange}
              formType="register"
              error={errors.name}
              icon={<BiUser style={{ display: "block" }} />}
            />

            <FormInput
              name="email"
              label="Email Address"
              value={registerData.email}
              onChange={handleInputChange}
              formType="register"
              error={errors.email}
              type="email"
              icon={<BiEnvelope style={{ display: "block" }} />}
            />

            <PasswordInput
              name="password"
              label="Password"
              value={registerData.password}
              onChange={(e) => handleInputChange(e, "register")}
              show={showPassword}
              toggleShow={() => setShowPassword(!showPassword)}
              error={errors.password}
              ref={passwordInputRef}
              icon={<RiLockPasswordLine style={{ display: "block" }} />}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              isFocused={isPasswordFocused}
            />

            <PasswordInput
              name="confirmPassword"
              label="Confirm Password"
              value={registerData.confirmPassword}
              onChange={(e) => handleInputChange(e, "register")}
              show={showConfirmPassword}
              toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
              error={errors.confirmPassword}
              ref={confirmPasswordInputRef}
              icon={<RiLockPasswordFill style={{ display: "block" }} />}
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() => setIsConfirmPasswordFocused(false)}
              isFocused={isConfirmPasswordFocused}
            />

            <FormInput
              name="phoneNumber"
              label="Phone Number"
              value={registerData.phoneNumber}
              onChange={handleInputChange}
              formType="register"
              error={errors.phoneNumber}
              type="tel"
              icon={<BiPhone style={{ display: "block" }} />}
            />

            <div className={`inputGroup ${errors.country ? "hasError" : ""}`}>
              <select
                name="country"
                id="country"
                value={registerData.country}
                onChange={handleSelectChange}
                onBlur={validate}
                className={registerData.country !== "" ? "hasContent" : ""}
              >
                <option value="" disabled hidden></option>

                <option
                  value=""
                  disabled
                  style={{
                    textDecoration: "underline",
                    color: "grey",
                    fontStyle: "italic",
                  }}
                >
                  Select a Country
                </option>

                <option value="USA">United States</option>

                <option value="UK">United Kingdom</option>

                <option value="NG">Nigeria</option>
              </select>

              <label htmlFor="country" className="floatingLabel selectLabel">
                Country
              </label>

              <div className="inputIcon">
                <ImLocation2 style={{ display: "block" }} />
              </div>

              {isSubmitted && errors.country && (
                <span className="errorMessage">{errors.country}</span>
              )}
            </div>

            <button type="submit" className="submitBtn">
              Sign Up
            </button>
          </form>

          <div className="socialLogin">
            <button className="socialBtn google">
              <FaGoogle style={{ display: "block" }} className="socialIcon" />{" "}
              Sign up with Google
            </button>

            <button className="socialBtn apple">
              <FaApple style={{ display: "block" }} className="socialIcon" />
              Sign up with Apple
            </button>
          </div>
        </div>

        <div className="authForm loginForm">
          <div className="modalHeader">
            <h2>Login to Organix</h2>

            <p>
              Don't have an account?{" "}
              <span
                className="link"
                onClick={() => setIsLogin(false)}
                role="button"
              >
                Register
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <FormInput
              name="email"
              label="Email Address"
              value={loginData.email}
              onChange={handleInputChange}
              formType="login"
              error={errors.email}
              type="email"
              icon={<BiEnvelope style={{ display: "block" }} />}
            />

            <PasswordInput
              name="password"
              label="Password"
              value={loginData.password}
              onChange={(e) => handleInputChange(e, "login")}
              show={showPassword}
              toggleShow={() => setShowPassword(!showPassword)}
              error={errors.password}
              ref={passwordInputRef}
              icon={<RiLockPasswordLine style={{ display: "block" }} />}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              isFocused={isPasswordFocused}
            />

            <button type="submit" className="submitBtn">
              Sign In
            </button>
          </form>

          <div className="separator">
            <span>OR</span>
          </div>

          <div className="socialLogin">
            <button className="socialBtn google">
              <FaGoogle style={{ display: "block" }} className="socialIcon" />{" "}
              Sign in with Google
            </button>

            <button className="socialBtn apple">
              <FaApple style={{ display: "block" }} className="socialIcon" />{" "}
              Sign in with Apple
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="authModalOverlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`authModalContent ${isLogin ? "" : "show-register"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="closeBtn" onClick={onClose}>
          <BiX />
        </button>

        <div className="modalImage">
          <img src={images.organicFood} alt="Organic produce" effect="blur" />
        </div>

        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </div>
    </div>
  );
};

export default AuthModal;
