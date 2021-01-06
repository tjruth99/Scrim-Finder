import React, { useState, useEffect } from "react";
import "./style.css";

import ScrimCard from "../ScrimCard";

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

  useEffect(() => {
    console.log("New scrim added");
    getScrimData();
    props.refreshCallback(false);
  }, [props.refresh]);
  

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
