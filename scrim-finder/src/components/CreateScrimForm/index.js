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
};

const CreateScrimForm = (props) => {
  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (event) => {
    updateFormData({
      ...formData,

      [event.target.name]: event.target.value.trim(),
    });
  };

  const handleSubmit = (event) => {
    let request = `http://localhost:5000/scrims`;
    console.log(formData);

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
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        alert("Server Timeout");
      });
  };

  return (
    <>
      <div class="create-scrim-form">
        <span className="title">Post a new scrim</span>
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
          onChange={handleChange}
        />
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
        <label className="label" for="elo">
          Elo:
        </label>
        <input
          className="create-input"
          type="text"
          id="elo"
          name="elo"
          onChange={handleChange}
        />
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
        <button className="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default CreateScrimForm;
