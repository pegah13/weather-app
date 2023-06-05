import cloudsh from "./assets/cloudsh.jpg";
export default function Weather(props) {
  const weather = props.weather;
  let date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="container">
      {weather.cod === "404" || weather === "null" ? (
        <div className="data-error">The City can't be reached</div>
      ) : (
        <>
          <img
            className="background"
            alt=""
            src={
              props.photo === "empty" || props.photo.errors
                ? cloudsh
                : props.photo.urls.regular
            }
          />
          <div className="display">
            <div className="city">{weather.name}</div>
            <div className="date">
              {dayNames[date.getDay()]}-{date.getDate()}{" "}
              {monthNames[date.getMonth()]}
            </div>
            <div className="temp">{weather.main.temp.toFixed()} °C</div>
            <div className="highlow">
              high:{weather.main.temp_max.toFixed()} / low:{" "}
              {weather.main.temp_min.toFixed()}
            </div>
            <div className="weather-description">
              <div className="description">
                {weather.weather[0].description}
              </div>
              <div className="icon">
                <img
                  src={
                    "http://openweathermap.org/img/w/" +
                    weather.weather[0].icon +
                    ".png"
                  }
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
