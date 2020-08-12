import { appid } from "./consts";

const fetchWeather = async ({ lat, lon }) => {
  const params = new URLSearchParams({ lat, lon, appid }).toString();
  const url = `https://api.openweathermap.org/data/2.5/onecall?${params}`;
  const response = await fetch(url);
  return await response.json();
};

export { fetchWeather };
