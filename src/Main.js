import React, { useState } from "react";
import { useEffect } from "react";
import { phish } from "./phish";
// import Masonry from "react-masonry-css";
import "./App.css";

function Main() {
  const [shows, setShows] = useState(phish);
  const [timer, setTimer] = useState([]);
  const [isTimerLoading, setisTimerLoading] = useState(true);
  const [showStatement, setShowStatement] = useState(false);

  const runFunctionWithTimes = () => {
    let newObjects = [];
    for (let i = 0; i < shows.length; i++) {
      // let startTimes = shows.map(value => value.time);
      // let todayStamp = new Date().getTime();
      let show = shows[i];
      let showTime = show.time;
      let showDate = new Date(showTime);
      const today = new Date();
      const difference = showDate - today;
      let minLeft = {};

      let displayDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      let displayHours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      let displayMinutes = Math.floor((difference / 1000 / 60) % 60);
      let displaySeconds = Math.floor((difference / 1000) % 60);

      if (displayDays < 10) displayDays = "0" + displayDays;
      if (displayHours < 10) displayHours = "0" + displayHours;
      if (displayMinutes < 10) displayMinutes = "0" + displayMinutes;
      if (displaySeconds < 10) displaySeconds = "0" + displaySeconds;

      if (difference > 0) {
        minLeft = {
          days: displayDays,
          hours: displayHours,
          minutes: displayMinutes,
          seconds: displaySeconds,
        };
        if (show.minLeft !== minLeft) {
          show = { ...show, minLeft };
          newObjects.push(show);
        } else {
          newObjects.push(show);
        }
        // console.log(shows);
        // setTimer(newObjects[0].minLeft);
      } else {
        minLeft = {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
        show = { ...show, minLeft };
        newObjects.push(show);
        setShowStatement(true);
      }
    }
    // work on code block for main timer, shuffling through this array shows.map(value => value.minLeft)
        // console.log(startTimes);
        // console.log(todayStamp);
        
          // if (startTimes[0] <= todayStamp) {
          //   console.log('next show!')
          //   setTimer(newObjects[1].minLeft)
          // }
    setTimer(newObjects[0].minLeft);
    return (setShows(newObjects), setisTimerLoading(false));
  };

  useEffect(() => {
    const tick = setTimeout(() => {
      runFunctionWithTimes();
    }, 1000);
    return () => clearInterval(tick);
  });

  // console.log(shows.map(value => value.minLeft));

  const clickMap = (id) => {
    const newShows = [];
    shows.forEach((show) => {
      if (show.id === id) {
        const changedShows = { ...show, showMap: !show.showMap };
        newShows.push(changedShows);
      } else {
        newShows.push(show);
      }
    });
    setShows(newShows);
  };

  // const breakpointColumnsObj = {
  //   default: 3,
  //   1200: 2,
  //   800: 1,
  // };

  return (
    <div>
      <div className="container">
        <h1 className="gradient-text">2023 Phish Summer Tour</h1>
      </div>
      <div className="container">
        <h2 style={{ margin: ".25em" }}>The next show is in:</h2>
        {isTimerLoading ? (
          <h2 className="timer">Loading . . .</h2>
        ) : (
          <h2 className="timer">
            {showStatement
              ? `It's showtime!`
              : `${timer.days} : ${timer.hours} : ${timer.minutes} : ${timer.seconds}`}
          </h2>
        )}
      </div>
      {/* <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      > */}
        <div className="list">
        {shows.map((element) => {
          const {
            id,
            date,
            venue,
            photo,
            link,
            address,
            tickets,
            showMap,
            minLeft,
          } = element;
          return (
            <div
              className="item"
              key={id}
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(" +
                  photo +
                  ")",
              }}
            >
              {showStatement ? (
                <h3>It's showtime!</h3>
              ) : (
                <h3 style={{ fontSize: "1em" }}>
                  This show is in:{" "}
                  {isTimerLoading ? (
                    <span className="showTimers">Loading . . .</span>
                  ) : (
                    <span className="showTimers">
                      {showStatement
                        ? `It's showtime!`
                        : `${minLeft.days} : ${minLeft.hours} : ${minLeft.minutes} : ${minLeft.seconds}`}
                    </span>
                  )}
                </h3>
              )}
              <h2>{date}</h2>
              <h3>{venue}</h3>
              <h4>{address}</h4>
              <div className="btnz">
                <button className="btnMap" onClick={() => clickMap(id)}>
                  {showMap ? "hide map" : "show map"}
                </button>
                <form action={tickets}>
                  <button type="submit" formTarget="_blank">
                    Tickets
                  </button>
                </form>
              </div>
              <iframe
                src={link}
                title={venue}
                style={{
                  display: `${showMap ? "block" : "none"}`,
                  width: "300px",
                  height: "150px",
                  border: "0",
                  margin: "0.5em 0",
                }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          );
        })}
        </div>
      {/* </Masonry> */}
    </div>
  );
}

export default Main;
