import React, { useState, useEffect } from "react";
import "./style.css";

const ScrimCard = (props) => {
  const [newTime, updateNewTime] = useState({
    start: "",
    end: "",
  });

  const get12HourTime = () => {
    let startHour = parseInt(props.info.startTime.substring(0, 2));
    let endHour = parseInt(props.info.endTime.substring(0, 2));
    let startPeriod, endPeriod;

    if (startHour > 12) {
      startHour = startHour % 12;
      startPeriod = "PM";
    } else if (startHour == 0) {
      startHour = 12;
      startPeriod = "AM";
    } else {
      startPeriod = "AM";
    }

    if (endHour > 12) {
      endHour = endHour % 12;
      endPeriod = "PM";
    } else if (endHour == 0) {
      endHour = 12;
      endPeriod = "AM";
    } else {
      endPeriod = "AM";
    }

    let start =
      startHour.toString() +
      ":" +
      props.info.startTime.substring(3) +
      " " +
      startPeriod;

    let end =
      endHour.toString() +
      ":" +
      props.info.endTime.substring(3) +
      " " +
      endPeriod;

    updateNewTime({
      start: start,
      end: end,
    });
  };

  useEffect(() => {
    get12HourTime();
  }, [props.data]);

  return (
    <>
      <div className="card">
        <div className="game">{props.info.game}</div>
        <div className="team-name">
          <span className="descriptor">Team Name: </span>
          {props.info.teamName}
        </div>
        <div className="discord">
          <span className="descriptor">Discord ID: </span>
          {props.info.discord}
        </div>
        <div className="date-time">
          <div>
            <span className="descriptor">Date: </span>
            {props.info.date}
          </div>
          <div>
            {newTime.start}-{newTime.end}
          </div>
        </div>
        <div className="elo">
          <span className="descriptor">Elo: </span>
          {props.info.elo}
        </div>
        <div className="region">
          <span className="descriptor">Region: </span>
          {props.info.region}
        </div>
      </div>
    </>
  );
};

const ScrimDisplay = (props) => {
  const [scrimData, updateScrimData] = useState([]);

  const getScrimData = () => {
    var settings = "";

    for (const property in props.data) {
      if (props.data[property] !== "") {
        settings = settings.concat(property, "=", props.data[property], "&");
      }
      //console.log(`${property}: ${props.data[property]}`);
    }

    let request = `http://localhost:5000/scrims?${settings}`;
    console.log(request);

    fetch(request, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "cors",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (Object.keys(data).length === 0) {
          updateScrimData([]);
        } else {
          updateScrimData(data);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Server Timeout");
      });
  };

  const sortScrimData = property => () => {
    let sortedData = [...scrimData];
    updateScrimData(sortedData.sort((a,b) => (a[property] >= b[property]) ? 1 : -1));
  }

  useEffect(() => {
    getScrimData();
  }, [props.data]);

  useEffect(() => {
    
  }, [scrimData]);
  

  console.log(scrimData);

  return (
    <>
      <div className="container">
        <button className="refresh-button" onClick={getScrimData}>
          Refresh
        </button>
        <div className="sort-list">
          <div className="sort-text">Sort by:</div>
          <button className="sort-button" id="game-sort-button" onClick={sortScrimData("game")}>Game</button> 
          <button className="sort-button" id="team-name-sort-button" onClick={sortScrimData("teamName")}>Team Name</button>
          <button className="sort-button" id="date-sort-button" onClick={sortScrimData("date")}>Date</button>
          <button className="sort-button" id="start-time-sort-button" onClick={sortScrimData("startTime")}>Start Time</button>
          <button className="sort-button" id="elo-sort-button" onClick={sortScrimData("elo")}>Elo</button>
        </div>
        {scrimData.length == 0 ?  <div className="empty-list-card">No Scrims Found</div> : scrimData.map((i) => (
          <ScrimCard info={i} />
        ))}
      </div>
    </>
  );
};

export default ScrimDisplay;
