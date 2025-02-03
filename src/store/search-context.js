import { createContext } from "react";

const searchContext=createContext({
    error:"",
    setError:()=>{},
    city:"",
    weather:null,
    setWeather:()=>{},
    searchInput:"",
    setSearchInput:()=>{},
    hourlyForeCast:null,
    setHourlyForeCast:()=>{},
    dailyForeCast:null,
    setDailyForeCast:()=>{},

})
export default searchContext;