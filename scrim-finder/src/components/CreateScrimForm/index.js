import React, { useState } from "react";
import "./style.css";

const listOfGames = [
  "Overwatch",
  "Valorant",
  "CS:GO",
  "League Of Legends",
  "Dota 2",
];

const initialFormData = {
  teamName: "",
  game: listOfGames[0],
  date: "",
  startTime: "",
  endTime: "",
  elo: "",
  region: "",
  discord: "",
};

const OverwatchElo = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Masters",
  "Grandmaster",
];

const ValorantElo = [
  "Iron 1",
  "Iron 2",
  "Iron 3",
  "Bronze 1",
  "Bronze 2",
  "Bronze 3",
  "Silver 1",
  "Silver 2",
  "Silver 3",
  "Gold 1",
  "Gold 2",
  "Gold 3",
  "Platinum 1",
  "Platinum 2",
  "Platinum 3",
  "Diamond 1",
  "Diamond 2",
  "Diamond 3",
  "Immortal 1",
  "Immortal 2",
  "Immortal 3",
  "Radiant",
];

const CSGOElo = [
  "Silver I",
  "Silver II",
  "Silver III",
  "Silver IV",
  "Silver Elite",
  "Silver Elite Master",
  "Gold Nova I",
  "Gold Nova II",
  "Gold Nova III",
  "Gold Nova Master",
  "Master Guardian I",
  "Master Guardian II",
  "Master Guardian Elite",
  "Distinguished Master Guardian",
  "Legendary Eagle",
  "Legendary Eagle Master",
  "Supreme Master First Class",
  "The Global Elite",
];

const LeagueOfLegendsElo = [
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Master",
  "Grand Master",
  "Challenger",
];

const listOfElo = [OverwatchElo, ValorantElo, CSGOElo, LeagueOfLegendsElo];

const initialErrorData = {
  teamName: "Must enter a team name",
  date: "Cannot make a scrim for a previous date",
  startTime: "Cannot create a start time at selected time",
  endTime: "End time must be after start time",
  elo: "Must enter an elo",
  region: "Must enter a region",
  discord: "Must enter a valid Discord ID",
};

const CreateScrimForm = (props) => {
  const [formData, updateFormData] = useState(initialFormData);
  const [errorData, updateErrorData] = useState(initialFormData);

  let d = new Date();

  const verifyFormData = () => {
    console.log(formData);

    const discordRegex = /([a-zA-Z0-9])+#([0-9])+/;

    let error = { ...initialErrorData };
    let numOfErrors = 7;

    let year = d.getFullYear();
    let month = (d.getMonth() + 1).toString().padStart(2, "0");
    let date = (d.getDate() + 1).toString().padStart(2, "0");

    let fullDate = `${year}-${month}-${date}`;

    let hour = d.getHours().toString().padStart(2, "0");
    let minute = d.getMinutes();

    let curTime = `${hour}:${minute}`;

    if (formData.teamName !== "") {
      error.teamName = "";
      numOfErrors -= 1;
    }

    if (formData.date !== "" && formData.date >= fullDate) {
      error.date = "";
      numOfErrors -= 1;
    }

    if (
      formData.startTime !== "" &&
      (formData.date !== fullDate ||
        formData.startTime.localeCompare(curTime)) !== -1
    ) {
      error.startTime = "";
      numOfErrors -= 1;
    }

    if (
      formData.endTime !== "" &&
      formData.startTime.localeCompare(formData.endTime) === -1
    ) {
      error.endTime = "";
      numOfErrors -= 1;
    }

    if (formData.elo !== "") {
      error.elo = "";
      numOfErrors -= 1;
    }

    if (formData.region !== "") {
      error.region = "";
      numOfErrors -= 1;
    }

    if (
      formData.discord !== "" &&
      formData.discord.match(discordRegex) != null
    ) {
      error.discord = "";
      numOfErrors -= 1;
    }

    updateErrorData(error);

    return numOfErrors === 0;
  };

  const handleChange = (event) => {
    updateFormData({
      ...formData,

      [event.target.name]: event.target.value.trim(),
    });
  };

  const handleSubmit = (event) => {
    if (verifyFormData()) {
      let request = `http://localhost:5000/scrims`;
      console.log("sending", formData);

      fetch(request, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          mode: "cors",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          console.log(response.status);
          if (response.status == 409) {
            alert(`Error: ${response.json().message}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
          alert("Server Timeout");
        });
    }
  };

  const getEloRankings = () => {
    for (let i = 0; i < listOfGames.length; i++) {
      if (listOfGames[i] === formData.game) {
        return listOfElo[i];
      }
    }
  };

  return (
    <>
      <div class="form-card">
        <span className="title">Post a New Scrim</span>
        <label className="label" for="elo">
          Team Name:
        </label>
        <input
          className="create-input"
          type="text"
          id="teamName"
          name="teamName"
          onChange={handleChange}
        />
        <span className="error">{errorData.teamName}</span>
        <label className="label" for="game">
          Game:
        </label>
        <select
          className="create-input"
          id="game"
          name="game"
          onChange={handleChange}
        >
          {listOfGames.map((i) => (
            <option>{i}</option>
          ))}
        </select>
        <label className="label" for="date">
          Date:
        </label>
        <input
          className="create-input"
          type="date"
          id="date"
          name="date"
          min={`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`}
          onChange={handleChange}
        />
        <span className="error">{errorData.date}</span>
        <label className="label" for="startTime">
          Start Time:
        </label>
        <input
          className="create-input"
          type="time"
          id="startTime"
          name="startTime"
          onChange={handleChange}
        />
        <span className="error">{errorData.startTime}</span>
        <label className="label" for="endTime">
          End Time:
        </label>
        <input
          className="create-input"
          type="time"
          id="endTime"
          name="endTime"
          onChange={handleChange}
        />
        <span className="error">{errorData.endTime}</span>
        <label className="label" for="elo">
          Elo:
        </label>
        <select
          className="create-input"
          id="elo"
          name="elo"
          onChange={handleChange}
        >
          {getEloRankings().map((i) => (
            <option>{i}</option>
          ))}
        </select>
        <span className="error">{errorData.elo}</span>
        <label className="label" for="region">
          Region:
        </label>
        <input
          className="create-input"
          type="text"
          id="region"
          name="region"
          onChange={handleChange}
        />
        <span className="error">{errorData.region}</span>
        <label className="label" for="region">
          Discord ID:
        </label>
        <input
          className="create-input"
          type="text"
          id="discord"
          name="discord"
          onChange={handleChange}
        />
        <span className="error">{errorData.discord}</span>
        <button className="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default CreateScrimForm;
