import Search from "./components/search/Search";
import WeatherInfo from "./components/weatherInfo/WeatherInfo.js";
import SearchProvider from "./store/searchProvider";
function App() {
  return (
    <>
      <SearchProvider>
        <Search />
        <WeatherInfo/>
      </SearchProvider>
    </>
  );
}

export default App;
