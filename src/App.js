import React, { useState } from 'react'
import axios from 'axios';
import MainSection from './components/mainSection';
// import 'dotenv/config'

// require('dotenv').config();

const process = require("process");
const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fetchData = async () => {
    const apiKey = process.env.API_KEY;
    // const apiKey = "298a14ef5da3d6df9a805cae904fc1e4";

    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
      setWeatherData(res.data);
      setSubmitted(true);
      console.log(res.data);
    } catch (error) {
      console.log("Error Fetching the data");
    }
  }

  return (
    <div className="h-screen bg-[#141316] font-Changa flex flex-col justify-center items-center">
      <div className="mb-3 w-[500px] text-[25px] font-changa flex justify-between items-center">

        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className='px-4 py-3 w-[70%] outline-none border-none rounded-md' />
        <button type='submit' className='py-3 bg-blue-500 text-white font-changa w-[28%] outline-none border-none rounded-md' onClick={() => fetchData()}>SUBMIT</button>
      </div>
      {submitted ? (
        location ? (
          <MainSection place={location} data={weatherData} />
        ) : (
          <p className='text-red-400'><sup>*</sup>Please Enter your location</p>
        )
      ) : null}
    </div>
  )
}

export default App;