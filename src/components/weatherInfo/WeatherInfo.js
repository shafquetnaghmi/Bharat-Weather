import React, { useContext, useState } from "react";
import searchContext from "../../store/search-context";
import styles from "./WeatherInfo.module.css"; // Import CSS file

const WeatherInfo = () => {
  const { weather, hourlyForeCast, dailyForeCast } = useContext(searchContext);

  const [showHourly, setShowHourly] = useState(false);
  const [showDaily, setShowDaily] = useState(false);

  if (!weather) return null;

  return (
    <div className={styles["weather-container"]}>
       
      <h2>Weather in {weather.name}</h2>
      <p className={styles["weather-details"]}>{new Date(weather.dt * 1000).toLocaleDateString("en-US", { weekday: 'long' })}</p>
      <p className={styles["weather-details"]}>{weather.main.temp}°C</p>
      <p className={styles["weather-details"]}> {weather.main.humidity}%</p>
      <p className={styles["weather-details"]}>{weather.wind.speed} m/s</p>
      <p className={styles["weather-details"]}>{weather.weather[0].description}</p>

      {weather.weather[0].icon && (
        <img
          src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
          alt="Weather Icon"
          className={styles["weather-icon"]}
        />
      )}
      {/* Toggle Daily Forecast */}
      {/* <button onClick={() => setShowDaily(!showDaily)} className={styles.button}>
        {showDaily ? "Hide Daily Forecast" : "Show Daily Forecast"}
      </button> */}
      {dailyForeCast && (
        <div className={styles["daily-forecast"]}>
            {dailyForeCast.map((day, index) => (
            <div key={index} className={styles["forecast-card"]}>
              {/* <strong>{new Date(day.dt * 1000).toLocaleTimeString()}</strong> */}
              <p className={styles.day}>{new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: 'long' })}</p>
              <p>{day.main.temp}°C</p>
              <p>{day.weather[0].description}</p>
              {/* <p>{day.wind.speed}</p> */}
              <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="Weather Icon" />
            </div>
          ))}
         
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;

