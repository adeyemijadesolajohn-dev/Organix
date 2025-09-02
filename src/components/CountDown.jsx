import React, { useState, useEffect } from "react";
import "../styles/CountDown.scss";

const CountDown = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [currentEndDate, setCurrentEndDate] = useState(endDate);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = new Date(currentEndDate).getTime() - now;

      if (difference < 0) {
        if (!isPaused) {
          setIsPaused(true);
          const newPauseDate = new Date(
            now + 1000 * 60 * 60 * 24
          ).toISOString();
          setCurrentEndDate(newPauseDate);
          setTimeLeft({
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00",
          });
        } else {
          setIsPaused(false);
          const newRandomEndDate = new Date(
            now +
              Math.random() * (1000 * 60 * 60 * 24 * 30) +
              1000 * 60 * 60 * 24 * 5
          ).toISOString();
          setCurrentEndDate(newRandomEndDate);
        }
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

      const formatNumber = (num) => (num < 10 ? "0" + num : num.toString());

      setTimeLeft({
        days: formatNumber(timeDays),
        hours: formatNumber(timeHours),
        minutes: formatNumber(timeMinutes),
        seconds: formatNumber(timeSeconds),
      });
    };

    calculateTimeLeft();

    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [currentEndDate, isPaused]);

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
