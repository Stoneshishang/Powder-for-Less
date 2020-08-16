import { weatherAPIkey as appid, flightAPIkey } from "./apiKeys";

const fetchWeather = async ({ lat, lon }) => {
  const weatherParams = new URLSearchParams({
    lat,
    lon,
    appid,
  }).toString();

  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?${weatherParams}`;
  // const url = "https://jsonplaceholder.typicode.com/posts"; //for testing in case of infinite loop
  const response = await fetch(weatherURL);
  const weatherJsonResponse = await response.json();

  return weatherJsonResponse;
};

const fetchFlight = async () =>
  //   {
  //   originplace,
  //   destinationplace,
  //   outboundpartialdate,
  //   inboundpartialdate,
  // }
  {
    const flightURL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/dtw-sky/den-sky/2020-08-19?inboundpartialdate=2020-08-21`;

    const response = await fetch(flightURL, {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": flightAPIkey,
      },
    });

    const flightJsonResponse = await response.json();

    return flightJsonResponse;
  };

export { fetchWeather, fetchFlight };
