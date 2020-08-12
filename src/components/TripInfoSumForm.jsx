import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";

import { Context } from "../ContextState";
// import axios from "axios";

// const useFetch = (url) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Similar to componentDidMount and componentDidUpdate:
//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch(url);
//       const data = await response.json();
//       console.log('*****************************************************');
//       console.log("data before access is: ", data);
//       const item = data.daily[7].weather[0].description;
//       setData(item);
//       console.log("weather description is: ", item);
//       setLoading(false);
//     }
//     fetchData();
//   }, [url]);

//   console.log("data outside of useEffect is: ", data);

//   return { data, loading };
// };

const TripInfoSum = () => {
  const {
    airport,
    selectedMW,
    selectedRockies,
    selectedSierra,
    num,
    departureDate,
    returnDate,
    weatherData,
    fetchWeatherData,
  } = useContext(Context);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const currentDate = yyyy + "-" + mm + "-" + dd;
  const departureTimeDiff = new Date(departureDate) - new Date(currentDate);
  const daysDepartureTimeDiff = departureTimeDiff / (1000 * 60 * 60 * 24);

  console.log("darparture days difference is: ", daysDepartureTimeDiff);

  const [count, setCount] = useState(0);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // update selected date item
  useEffect(() => {
    if (loading) {
      setLoading(false);
      const item = weatherData.data.daily[5].weather[0].description;
      setData(item);
    }
  }, [loading, weatherData.data]);

  console.log("data outside of useEffect is: ", data);
  // const { data, loading } = useFetch(
  //   "https://api.openweathermap.org/data/2.5/onecall?lat=40.562307&lon=-111.640067&appid=7627edc2f6ba9856d14e74e740f35ff0",
  // );

  // const submitHandler = event => {
  //   event.preventDefault();

  // }

  // handler used to trigger api fetch with necessary data
  const handleFetchWeather = () => {
    const lat = "40.562307";
    const lon = "-111.640067";
    setLoading(true);
    fetchWeatherData({ lat, lon }); // pass in the date
  };

  return (
    <div>
      <pre>
        TripInfoSum selected MW resorts are {JSON.stringify(selectedMW)}
      </pre>
      <pre>
        TirpInfoSum Rockies resorts are {JSON.stringify(selectedRockies)}
      </pre>
      <pre>TirpInfoSum Sierra resorts are {JSON.stringify(selectedSierra)}</pre>

      <pre>TripInfoSum home airpot is {JSON.stringify(airport)}</pre>

      <pre>TripInfoSum Number of Traveler is {JSON.stringify(num)}</pre>

      <pre>TripInfoSum departure Date is {JSON.stringify(departureDate)}</pre>

      <pre>TripInfoSum return Date is {JSON.stringify(returnDate)}</pre>

      {/* <form onSubmit={submitHandler}> */}

      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        {loading ? <div>...loading</div> : <div>{data}</div>}
        {console.log("JSX data is: ", data)}
      </div>

      {/* </form> */}
    </div>
  );
};

export default TripInfoSum;
