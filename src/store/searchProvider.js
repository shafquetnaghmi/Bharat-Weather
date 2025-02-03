import { useState } from "react";
import searchContext from "./search-context";

const SearchProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [hourlyForeCast,setHourlyForeCast]=useState(null);
  const [dailyForeCast,setDailyForeCast]=useState(null);
  const [error,setError]=useState("");
  const searchContextValue = {
    city,
    setCity,
    weather,
    setWeather,
    searchInput,
    setSearchInput,
    hourlyForeCast,
    setHourlyForeCast,
    dailyForeCast,
    setDailyForeCast,
    error,
    setError,
  };
  return (
    <searchContext.Provider value={searchContextValue}>
      {children}
    </searchContext.Provider>
  );
};
export default SearchProvider;
