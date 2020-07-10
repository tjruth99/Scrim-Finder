import React, { useState } from "react";
import "./App.css";

import FindScrimForm from "./components/FindScrimForm";
import CreateScrimForm from "./components/CreateScrimForm";
import ScrimDisplay from "./components/ScrimDisplay";

const listOfGames = [
  "Overwatch",
  "Valorant",
  "CS:GO",
  "League Of Legends",
  "Dota 2",
];

const initialFormData = {
  game: listOfGames[0],
  date: "",
  startTime: "",
  endTime: "",
  elo: "",
  region: "",
};

function App() {
  const [searchData, updateSearchData] = useState(initialFormData);

  const findScrimCallback = (data) => {
    updateSearchData(data);
  };

  return (
    <div className="App">
      <CreateScrimForm />
      <br />
      <FindScrimForm data={searchData} callback={findScrimCallback} />
      <br />
      <ScrimDisplay data={searchData} />
    </div>
  );
}

export default App;
