import { weatherAPIkey as appid, flightAPIkey } from "./apiKeys";
import axios from "axios";

// const fetchWeather = async ({ lat, lon }) => {
//   const weatherParams = new URLSearchParams({
//     lat,
//     lon,
//     appid,
//   }).toString();

//   const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?${weatherParams}`;
//   // const url = "https://jsonplaceholder.typicode.com/posts"; //for testing in case of infinite loop
//   const response = await fetch(weatherURL);
//   const weatherJsonResponse = await response.json();
//   // console.log("fetchAPI weatherJsonResponse is: ", weatherJsonResponse);

//   return weatherJsonResponse;
// };

// const fetchFlight = async ({
//   originplace,
//   destinationplace,
//   outboundpartialdate,
//   inboundpartialdate,
// }) => {
//   const flightURL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${originplace}/${destinationplace}/${outboundpartialdate}?inboundpartialdate=${inboundpartialdate}`;

//   const response = await fetch(flightURL, {
//     method: "GET",
//     headers: {
//       "x-rapidapi-host":
//         "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
//       "x-rapidapi-key": flightAPIkey,
//     },
//   });

//   const flightJsonResponse = await response.json();

//   return flightJsonResponse;
// };

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

  const weather = await axios(weatherURL);
  const flight = await axios(flightURL, {
    method: "GET",
    headers: {
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": flightAPIkey,
    },
  });

  console.log("weather is: ", weather);
  console.log("flight is: ", flight);

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
