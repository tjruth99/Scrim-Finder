import React, { useState, useEffect } from "react";
import "./style.css";

import ScrimCard from "../ScrimCard";
import DebugScrimCard from "../DebugScrimCard";

const ScrimDisplay = (props) => {
  const [scrimData, updateScrimData] = useState([]);
  const [refreshData, updateRefreshData] = useState(false);

  const getScrimData = () => {
    var settings = "";

    // Get each property from search data to create query parameters for api call
    for (const property in props.searchData) {
      if (props.searchData[property] !== "") {
        settings = settings.concat(property, "=", props.searchData[property], "&");
      }
      //console.log(`${property}: ${props.searchData[property]}`);
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
          // Set scrimData to be the new list of scrims
          updateScrimData(data);
          updateRefreshData(false);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Server Timeout");
      });
  };

  // Sort scrim data based on given property
  const sortScrimData = property => () => {
    let sortedData = [...scrimData];
    updateScrimData(sortedData.sort((a,b) => (a[property] >= b[property]) ? 1 : -1));
  }

  // Callback function called inside debug scrim card to refresh the list of scrims when it gets deleted/edited
  const refreshScrimsOnEdit = () => {
    console.log("Refresh Scrims");
    updateRefreshData(true);
  }

  // Update scrim data when search data is updated
  useEffect(() => {
    getScrimData();
  }, [props.searchData]);

  useEffect(() => { }, [scrimData]);

  // Refresh scrim data when a new scrim is added from CreateScrimForm
  useEffect(() => {
    if(props.refresh === true){
      getScrimData();
      props.refreshCallback(false);
    }
  }, [props.refresh]);

  // Refresh scrim data when a scrim gets deleted / edited
  useEffect(() => {
    if(refreshData === true){
      getScrimData();
    }
  }, [refreshData]);
  
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
        {scrimData.length === 0 ?  <div className="empty-list-card">No Scrims Found</div> : scrimData.map((i) => (
          props.isDebug ? <DebugScrimCard info={i} callback={refreshScrimsOnEdit}/> : <ScrimCard info={i} />
        ))}
      </div>
    </>
  );
};

export default ScrimDisplay;
