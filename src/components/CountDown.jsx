import React from "react";
import "../styles/CountDown.scss";

const CountDown = () => {
  const rundown = () => {
    const endDate = new Date("January 1, 2030 00:00:00").getTime();
    const now = new Date().getTime();

    const difference = endDate - now;

    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;

    let timeDays = Math.floor(difference / days);
    let timeHours = Math.floor((difference % days) / hours);
    let timeMinutes = Math.floor((difference % hours) / minutes);
    let timeSeconds = Math.floor((difference % minutes) / seconds);

    timeHours = timeHours < 10 ? "0" + timeHours : timeHours;
    timeMinutes = timeMinutes < 10 ? "0" + timeMinutes : timeMinutes;
    timeSeconds = timeSeconds < 10 ? "0" + timeSeconds : timeSeconds;

    document.getElementById("days").innerHTML = timeDays;
    document.getElementById("hours").innerHTML = timeHours;
    document.getElementById("minutes").innerHTML = timeMinutes;
    document.getElementById("seconds").innerHTML = timeSeconds;
  };

  setInterval(rundown, 1000);

  return (
    <div className="countdown">
      <div>
        <p id="days">00</p>
        <h5>DAYS</h5>
      </div>

      <div>
        <p id="hours">00</p>
        <h5>HRS</h5>
      </div>

      <div>
        <p id="minutes">00</p>
        <h5>MINS</h5>
      </div>

      <div>
        <p id="seconds">00</p>
        <h5>SECS</h5>
      </div>
    </div>
  );
};

export default CountDown;
