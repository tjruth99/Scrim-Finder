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

const initialErrorData = {
  teamName: "Must enter a team name",
  date: "Cannot make a scrim for a previous date",
  startTime: "Cannot create a start time at selected time",
  endTime: "End time must be after start time",
  elo: "Must enter an elo",
  region: "Must enter a region",
};

const CreateScrimForm = (props) => {
  const [formData, updateFormData] = useState(initialFormData);
  const [errorData, updateErrorData] = useState(initialFormData);

  let d = new Date();

  const verifyFormData = () => {
    let error = { ...initialErrorData };
    let numOfErrors = 6;

    let year = d.getFullYear();
    let month = (d.getMonth() + 1).toString().padStart(2, "0");
    let date = d.getDate();

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
    }
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
        <input
          className="create-input"
          type="text"
          id="elo"
          name="elo"
          onChange={handleChange}
        />
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
        <button className="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default CreateScrimForm;
