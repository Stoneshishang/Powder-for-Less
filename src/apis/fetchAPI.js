import { weatherAPIkey as appid, flightAPIkey } from "./apiKeys";
import axios from "axios";

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
  // const flightURL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/DTW/DEN/2020-09-01?inboundpartialdate=2020-09-08`;

  const weather = await axios(weatherURL);
  const flight = await axios(flightURL, {
    method: "GET",
    headers: {
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": flightAPIkey,
    },
  });

  // Promise.all([fetch(weatherURL), fetch(flightURL)])
  //   .then(async ([weatherData, flightData]) => {
  //     const weather = await weatherData.json();
  //     const flight = await flightData.json();
  //     console.log("weather is: ", weather);
  //     console.log("flight is: ", flight);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  return { weather: weather, flight: flight };

  // axios.all([
  //   axios.get(weatherURL),
  //   axios.get(flightURL, {
  //     method: "GET",
  //     headers: {
  //       "x-rapidapi-host":
  //         "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
  //       "x-rapidapi-key": flightAPIkey,
  //     },
  //   })
  // ])
  // .then(axios.spread((weather,flight)=>{
  //   console.log('weather is: ', weather);
  //   console.log('flight is: ', flight);
  // }))
};

// export { fetchWeather, fetchFlight };

export { fetchBoth };
