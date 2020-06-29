import React, { useState, useEffect } from "react";
import "./style.css";

const ScrimCard = (props) => {
  console.log(props);
  return (
    <>
      <div className="card">
        <div className="game">{props.info.game}</div>
        <div className="team-name">{props.info.teamName}</div>
        <div className="date">{props.info.date}</div>
        <div className="time">
          {props.info.startTime}-{props.info.endTime}
        </div>
        <div className="elo">{props.info.elo}</div>
        <div className="region">{props.info.region}</div>
      </div>
    </>
  );
};

const ScrimDisplay = (props) => {
  const [scrimData, updateScrimData] = useState([]);
  const [refresh, updateRefresh] = useState(false);

  console.log(scrimData);

  const getScrimData = () => {
    let request = `http://localhost:5000/scrims`;

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
        updateScrimData(data);
      })
      .catch((error) => {
        console.log(error);
        alert("Server Timeout");
      });
  };

  useEffect(() => {
    getScrimData();
  }, [refresh]);

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
