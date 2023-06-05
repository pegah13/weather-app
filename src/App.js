import "./App.css";
import { useState } from "react";
import React from "react";
import Weather from "./Weather";
import cloudsh from "./assets/cloudsh.jpg";

function App() {
  const apiKey = "7343a4eba195e350c717a3a7c472c89a";
  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";

  const accessKey = "q2xcgSeA7HI3arQMdtGi3byvE12DYGFQYKsyT1JR9_k";
  const unsplashUrl =
    "https://api.unsplash.com/photos/random?topics=city,attractions,landmark&collections=city,attractions,landmark&";

  const [city, setCity] = useState("");
  const [data, setData] = useState();
  const [photo, setPhoto] = useState();
  const [isLoading, setIsLoading] = useState();

  const [orientation, setOrientation] = useState("");

  const getData = async () => {
    try {
      setIsLoading(true);
      await fetch(`${weatherUrl}q=${city},USA&APPID=${apiKey}&units=metric`)
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setData(data);
          getPhoto();
          setCity("");
        });
    } catch (error) {
      console.log(error);
      setData("null");
    }
  };

  const getPhoto = async () => {
    handleResize();
    try {
      await fetch(
        `${unsplashUrl}query=${city}&orientation=${orientation}&client_id=${accessKey}`
      )
        .then((res) => res.json())
        .then((photo) => {
          setPhoto(photo);
        });
    } catch (error) {
      console.log(error);
      setPhoto("empty");
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      getData();
    }
  };

  function handleResize() {
    if (window.innerWidth > window.innerHeight) {
      setOrientation("landscape");
    } else {
      setOrientation("portrait");
    }
  }

  return (
    <div className="main">
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}
      {data && photo && (
        <Weather key={data.name} weather={data} photo={photo} />
      )}
      <img className="background-main" src={cloudsh} />
      <div
        className="cityName"
        style={{
          height: `${data ? "0%" : "100vh"}`,
        }}
      >
        <input
          onChange={handleChange}
          onKeyDown={handleKeypress}
          value={city}
          className="cityName__input"
          placeholder="city"
          autoFocus={true}
        />
        <button onClick={getData} className="submit">
          submit
        </button>
      </div>
    </div>
  );
}

export default App;
