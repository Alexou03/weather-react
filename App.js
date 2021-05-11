import { useState } from "react";
import axios from "axios";
import "./styles.css";

let apiKey = "5779b9efe682cbd7772ff1fe36bcdf5f";
let units = "metric";

export default function App() {
  const [city, setCity] = useState(null);
  const [temp, setTemp] = useState(null);
  const [wind, setWind] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [icon, setIcon] = useState(null);
  const [search, setSearch] = useState("");

  const searchCity = () => {
    console.log("click");
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=${units}`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("response", response);
        setCity(response.data.name);
        setTemp(Math.round(response.data.main.temp));
        setWind(response.data.wind.speed);
        setHumidity(response.data.main.humidity);
        setIcon(response.data.weather[0].icon);
      })
      .catch((e) => {
        console.log("error", e.message);
      });
  };

  return (
    <div className="App">
      <h1>Weather app</h1>
      <div>
        <input
          className="search-input"
          name="city"
          placeholder="Enter a city"
          value={search}
          onInput={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button type="submit" onClick={searchCity}>
          Searchee
        </button>
      </div>
      {city != null ? (
        <div className="results-container">
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="icon"
          />
          <h2>{city}</h2>
          <p>Temperature: {temp}°C</p>
          <p>Wind: {wind} mph</p>
          <p>Humidity: {humidity}</p>
        </div>
      ) : null}
    </div>
  );
}
