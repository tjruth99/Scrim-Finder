import React, { useState, useEffect } from "react";
import "./style.css";

const ScrimCard = (props) => {
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
        <div className="date">
          <span className="descriptor">Date: </span>
          {props.info.date}
        </div>
        <div className="time">
          {props.info.startTime}-{props.info.endTime}
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
      console.log(`${property}: ${props.data[property]}`);
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

  useEffect(() => {
    getScrimData();
  }, [props.data]);

  console.log(scrimData);

  return (
    <>
      <div className="container">
        {scrimData.map((i) => (
          <ScrimCard info={i} />
        ))}
      </div>
    </>
  );
};

export default ScrimDisplay;
