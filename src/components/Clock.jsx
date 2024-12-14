import { useState, useEffect } from "react";
function Clock(prop) {
  const {
    city,
    timeZone,
    UpdateInterval,
    resetSpecificClock,
    doubleSpecificClock,
    RemoveClock,
  } = prop;
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const update = () => setTime(new Date());
    const timer = setInterval(update, UpdateInterval * 1000);
    return () => clearInterval(timer);
  }, [UpdateInterval]);

  return (
    <div className="clockCard">
      <button className="removeButton" onClick={() => RemoveClock(city)}>
        X
      </button>
      <h2 className="clockTitle">{city}</h2>
      <time className="clockDisplay" dateTime={time.toISOString()}>
        {time.toLocaleTimeString("en-US", { timeZone })}
      </time>
      <div className="intervalInfo">Update Interval: {UpdateInterval}s</div>
      <div className="clockControls">
        <button onClick={() => setTime(new Date())}>Update Me Now</button>
        <button onClick={() => doubleSpecificClock(city)}>
          Double My Interval
        </button>
        <button onClick={() => resetSpecificClock(city)}>
          Reset My Interval
        </button>
      </div>
    </div>
  );
}

export default Clock;
