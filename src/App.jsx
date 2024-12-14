import { useState } from "react";
import Clock from "./components/Clock";
import "./App.css";
const cities = [
  { city: "New York City", timeZone: "America/New_York", UpdateInterval: 1 },
  { city: "London", timeZone: "Europe/London", UpdateInterval: 1 },
  { city: "Jerusalem", timeZone: "Asia/Jerusalem", UpdateInterval: 1 },
  { city: "Tokyo", timeZone: "Asia/Tokyo", UpdateInterval: 1 },
  { city: "Berlin", timeZone: "Europe/Berlin", UpdateInterval: 1 },
];

function App() {
  const [clocks, setClocks] = useState(cities.slice(0, 3));

  const RandomizeAllIntervals = () => {
    setClocks((prev) =>
      prev.map((clock) => ({
        ...clock,
        UpdateInterval: Math.floor(Math.random() * 10) + 1,
      }))
    );
  };

  const DoubleAllIntervals = () => {
    setClocks((prev) =>
      prev.map((clock) => ({
        ...clock,
        UpdateInterval: (clock.UpdateInterval *= 2),
      }))
    );
  };

  const ResetAllIntervals = () => {
    setClocks((prev) =>
      prev.map((clock) => ({
        ...clock,
        UpdateInterval: 1,
      }))
    );
  };

  const AddClock = () => {
    if (clocks.length >= 5) {
      alert("Maximum number of clocks reached (5)");
      return;
    }

    const availableCities = cities.filter(
      (city) => !clocks.some((clock) => clock.city === city.city)
    );

    if (availableCities.length === 0) {
      alert("No more cities available to add");
      return;
    }

    const randomCity =
      availableCities[Math.floor(Math.random() * availableCities.length)];
    setClocks([...clocks, { ...randomCity }]);
  };

  const RemoveClock = (city) => {
    setClocks(clocks.filter((clock) => clock.city != city));
  };

  const resetSpecificClock = (city) => {
    setClocks((prev) =>
      prev.map((clock) =>
        clock.city === city ? { ...clock, UpdateInterval: 1 } : clock
      )
    );
  };

  const doubleSpecificClock = (city) => {
    setClocks((prev) =>
      prev.map((clock) =>
        clock.city === city
          ? { ...clock, UpdateInterval: (clock.UpdateInterval *= 2) }
          : clock
      )
    );
  };

  return (
    <div className="worldClocks">
      <h1 className="mainTitle">World Clock</h1>

      <div className="globalControls">
        <button onClick={RandomizeAllIntervals}>Randomize All Intervals</button>
        <button onClick={DoubleAllIntervals}>Double All Intervals</button>
        <button onClick={ResetAllIntervals}>Reset All Intervals</button>
      </div>

      <div className="clocksGrid">
        {clocks.map((clock) => (
          <Clock
            key={clock.city}
            city={clock.city}
            timeZone={clock.timeZone}
            UpdateInterval={clock.UpdateInterval}
            resetSpecificClock={resetSpecificClock}
            doubleSpecificClock={doubleSpecificClock}
            RemoveClock={RemoveClock}
          />
        ))}
      </div>

      <div className="addClock">
        <button onClick={AddClock}>Add New Clock</button>
      </div>
    </div>
  );
}
export default App;
