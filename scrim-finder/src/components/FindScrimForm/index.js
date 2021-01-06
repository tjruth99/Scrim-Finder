import React, { useState } from "react";
import "./style.css";

const listOfGames = [
  "All Games",
  "Overwatch",
  "Valorant",
  "CS:GO",
  "League Of Legends",
  "Dota 2",
];

const OverwatchElo = [
  "All",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Masters",
  "Grandmaster",
];

const ValorantElo = [
  "All",
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
  "All",
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
  "All",
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

const initialFormData = {
  game: "",
  date: "",
  startTime: "",
  endTime: "",
  elo: "",
  region: "",
  discord: "",
};

const FindScrimForm = (props) => {
  const [formData, updateFormData] = useState(initialFormData);

  // Updates form data when the user updates each field in the form
  const handleChange = (event) => {
    let value = event.target.value;

    // If all games are selected, set elo and game fields to be empty
    if (event.target.name === "game" && event.target.value === listOfGames[0]) {
      value = "";
      updateFormData({
        ...formData,

        elo: "",
        [event.target.name]: value,
      });

      return;
    }

    // If all elo is selected, set the form field to be empty
    if (event.target.name === "elo" && event.target.value === "All") {
      value = "";
    }

    // Update the form data with the edited field
    updateFormData({
      ...formData,

      [event.target.name]: value,
    });
  };

  // Send form data to parent with search data
  const handleSubmit = (event) => {
    props.callback(formData);
  };

  // When user switches game, switch the list of elo is displayed
  const getEloRankings = () => {
    if (formData.game === "") {
      return ["All"];
    }
    for (let i = 0; i < listOfGames.length; i++) {
      if (listOfGames[i + 1] === formData.game) {
        return listOfElo[i];
      }
    }
  };

  return (
    <>
      <div class="form-card">
        <span className="title">Find a Scrim</span>
        <label className="label" for="game">
          Game:
        </label>
        <select
          className="find-input"
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
          className="find-input"
          type="date"
          id="date"
          name="date"
          onChange={handleChange}
        />
        <label className="label" for="startTime">
          Start Time:
        </label>
        <input
          className="find-input"
          type="time"
          id="startTime"
          name="startTime"
          onChange={handleChange}
        />
        <label className="label" for="endTime">
          End Time:
        </label>
        <input
          className="find-input"
          type="time"
          id="endTime"
          name="endTime"
          onChange={handleChange}
        />
        <label className="label" for="elo">
          Elo:
        </label>
        <select
          className="find-input"
          id="elo"
          name="elo"
          onChange={handleChange}
        >
          {getEloRankings().map((i) => (
            <option>{i}</option>
          ))}
        </select>
        <label className="label" for="region">
          Region:
        </label>
        <input
          className="find-input"
          type="text"
          id="region"
          name="region"
          onChange={handleChange}
        />
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
        <button className="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default FindScrimForm;
