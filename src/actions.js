import { appid } from "./consts";

const fetchWeather = async ({ lat, lon }) => {
  const params = new URLSearchParams({ lat, lon, appid }).toString();
  const url = `https://api.openweathermap.org/data/2.5/onecall?${params}`;
  // const url = "https://jsonplaceholder.typicode.com/posts"; //for testing in case of infinite loop
  const response = await fetch(url);
  const jsonResponse = await response.json();
  // console.log("actions jsonResponse is: ", jsonResponse);
  return jsonResponse;
};

export { fetchWeather };
