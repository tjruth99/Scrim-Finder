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

const initialFormData = {
  game: "",
  date: "",
  startTime: "",
  endTime: "",
  elo: "",
  region: "",
};

const FindScrimForm = (props) => {
  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (event) => {
    let value =
      event.target.name === "game" && event.target.value === listOfGames[0]
        ? ""
        : event.target.value;

    updateFormData({
      ...formData,

      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    props.callback(formData);
  };

  return (
    <>
      <div class="find-scrim-form">
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
        <input
          className="find-input"
          type="text"
          id="elo"
          name="elo"
          onChange={handleChange}
        />
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
        <button className="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default FindScrimForm;
