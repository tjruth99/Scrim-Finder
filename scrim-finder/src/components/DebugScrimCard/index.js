import React, { useState, useEffect } from "react";
import "./style.css";

import OverwatchLogo from "../../icons/overwatch-icon.png";
import ValorantLogo from "../../icons/valorant-icon.png";
import LeagueLogo from "../../icons/lol-icon.png";
import CSLogo from "../../icons/cs-icon.png";
import DotaLogo from "../../icons/dota-icon.png";

const DebugScrimCard = (props) => {
  const [newTime, updateNewTime] = useState({
    start: "",
    end: "",
  });

  // Delete the given form when the delete button has been pressed
  const deleteScrim = (id) => {
    alert(`Deleting ${id}`);

    let request = `http://localhost:5000/scrims/${id}`;
    console.log(request);

    fetch(request, {
      method: "DELETE",
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
        // Callback display to show updated scrims
        props.callback();
      })
      .catch((error) => {
        console.log(error);
        alert("Server Timeout");
      });
  };

  // Convert the time to a readable format
  const get12HourTime = () => {
    let startHour = parseInt(props.info.startTime.substring(0, 2));
    let endHour = parseInt(props.info.endTime.substring(0, 2));
    let startPeriod, endPeriod;

    if (startHour > 12) {
      startHour = startHour % 12;
      startPeriod = "PM";
    } else if (startHour === 0) {
      startHour = 12;
      startPeriod = "AM";
    } else {
      startPeriod = "AM";
    }

    if (endHour > 12) {
      endHour = endHour % 12;
      endPeriod = "PM";
    } else if (endHour === 0) {
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

  // Get the icon for each game
  const GameToIcon = (name) => {
    switch(name){
      case "Overwatch":
        return OverwatchLogo;
      case "Valorant":
        return ValorantLogo;
      case "CS:GO":
          return CSLogo;
      case "League Of Legends":
        return LeagueLogo;
      case "Dota 2":
        return DotaLogo;
      default:
        return OverwatchLogo;
    }
  };

  // Convert the time to a readable format when the component mounts
  useEffect(() => {
    get12HourTime();
  }, [props.data]);

  return (
    <>
      <div className="debug-card">
        <div className="game"><img src={GameToIcon(props.info.game)} alt={props.info.game} className="icon" /></div>
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
        <div className="debug"><button className="debug-button" onClick={() => deleteScrim(props.info._id)}>Delete</button><button className="debug-button">Edit</button></div>
      </div>
    </>
  );
};

export default DebugScrimCard;
