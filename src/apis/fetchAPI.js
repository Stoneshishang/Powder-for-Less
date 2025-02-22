import { weatherAPIkey as appid, flightAPIkey } from "./apiKeys";
import axios from "axios";

//fetchBoth is the function that fetch both API
const fetchBoth = async ({
  lat,
  lon,
  originplace,
  destinationplace,
  outboundpartialdate,
  inboundpartialdate,
}) => {
  const weatherParams = new URLSearchParams({
    lat,
    lon,
    appid,
  }).toString();

  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?${weatherParams}`;

  const flightURL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${originplace}/${destinationplace}/${outboundpartialdate}?inboundpartialdate=${inboundpartialdate}`;

  const weatherData = await axios(weatherURL);
  const flightData = await axios(flightURL, {
    method: "GET",
    headers: {
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": flightAPIkey,
    },
  });

  return { weather: weatherData, flight: flightData };
};

export { fetchBoth };
