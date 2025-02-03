import React, { useContext, useEffect } from "react";
import searchContext from "../../store/search-context";
import ErrorMessage from "../Error/error";
import styles from "../search/Search.module.css";

const API_KEY = "202b8aba7139d29d222f304f56a56a12";

const Search = () => {
  const {
    city,
    setCity,
    setWeather,
    searchInput,
    setSearchInput,
    error,
    setError,
    setDailyForeCast,
    setHourlyForeCast,
  } = useContext(searchContext);

  useEffect(() => {
    const savedCity = localStorage.getItem("lastSearchedCity");
    if (savedCity) {
      setCity(savedCity);
    }
  }, [setCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      setError({ type: "EMPTY_INPUT" });
      return;
    }
    setCity(searchInput);
    localStorage.setItem("lastSearchedCity", searchInput);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const fetchWeather = async () => {
    if (!city.trim()) return; // If city is empty, don't make the API call

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        if (response.status === 404) throw { type: "NOT_FOUND" };
        if (response.status === 429) throw { type: "RATE_LIMIT" };
        if (response.status >= 500) throw { type: "SERVER_ERROR" };
        throw { type: "UNKNOWN_ERROR" };
      }

      const data = await response.json();
      setWeather(data);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!forecastResponse.ok) throw { type: "UNKNOWN_ERROR" };

      const forecastData = await forecastResponse.json();
      setHourlyForeCast(forecastData.list);
      setDailyForeCast(forecastData.list.filter((_, index) => index % 8 === 0));
      setError(null);
    } catch (err) {
      if (err.type) {
        setError(err);
      } else {
        setError({ type: "NETWORK_ERROR" });
      }
      setWeather(null);
      setHourlyForeCast(null);
      setDailyForeCast(null);
    }
  };

  // Polling logic
  useEffect(() => {
    fetchWeather(); 

    const intervalId = setInterval(() => {
      //console.log("api calling");
      fetchWeather(); // Fetch weather data periodically
    }, 30000); // Poll every 30 seconds 

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [city, setWeather, setDailyForeCast, setHourlyForeCast]);

  return (
    <div>
      <h1>Bharat Weather</h1>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="searchbar"
            value={searchInput}
            onChange={handleChange}
            className={styles.input}
            placeholder="Search your city"
          />
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>

        <ErrorMessage error={error} />
      </div>
    </div>
  );
};

export default Search;
