import React, { useState, useEffect } from "react";
import "../styles/CountDown.scss";

const CountDown = () => {
  const endDate = new Date("January 1, 2030 00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // Function to calculate and update the time left
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = endDate - now;

      if (difference < 0) {
        // If the countdown is over
        clearInterval(interval); // Stop the interval
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const seconds = 1000;
      const minutes = seconds * 60;
      const hours = minutes * 60;
      const days = hours * 24;

      const timeDays = Math.floor(difference / days);
      const timeHours = Math.floor((difference % days) / hours);
      const timeMinutes = Math.floor((difference % hours) / minutes);
      const timeSeconds = Math.floor((difference % minutes) / seconds);

      // Pad with leading zeros
      const formatNumber = (num) => (num < 10 ? "0" + num : num.toString());

      setTimeLeft({
        days: formatNumber(timeDays),
        hours: formatNumber(timeHours),
        minutes: formatNumber(timeMinutes),
        seconds: formatNumber(timeSeconds),
      });
    };

    // Call it once immediately to set the initial values
    calculateTimeLeft();

    // Set up the interval
    const interval = setInterval(calculateTimeLeft, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [endDate]); // Re-run effect if endDate changes

  return (
    <div className="countdown">
      <div className="countdownItem">
        <p className="countdownTimer" id="days">
          {timeLeft.days}
        </p>
        <h5 className="countdownText">DAYS</h5>
      </div>

      <div className="countdownItem">
        <p className="countdownTimer" id="hours">
          {timeLeft.hours}
        </p>
        <h5 className="countdownText">HRS</h5>
      </div>

      <div className="countdownItem">
        <p className="countdownTimer" id="minutes">
          {timeLeft.minutes}
        </p>
        <h5 className="countdownText">MINS</h5>
      </div>

      <div className="countdownItem">
        <p className="countdownTimer" id="seconds">
          {timeLeft.seconds}
        </p>
        <h5 className="countdownText">SECS</h5>
      </div>
    </div>
  );
};

export default CountDown;
