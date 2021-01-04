import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./App.css";

import FindScrimForm from "./components/FindScrimForm";
import CreateScrimForm from "./components/CreateScrimForm";
import ScrimDisplay from "./components/ScrimDisplay";
import DebugDisplay from "./components/DebugDisplay";

const initialFormData = {
  game: "",
  date: "",
  startTime: "",
  endTime: "",
  elo: "",
  region: "",
};

function App() {
  const [searchData, updateSearchData] = useState(initialFormData);
  const [showForms, updateShowForms] = useState(false);
  const [debugMode, updateDebugMode] = useState(false);

  const findScrimCallback = (data) => {
    updateSearchData(data);
  };

  return (
    <div className="App">
      <div className="header"><div className="page-title">Scrim Finder</div> <div className="header-links"></div></div>
      <button
        className="show-forms-button"
        onClick={() => updateShowForms(!showForms)}
      >
        Search / Create
      </button>
      <CSSTransition
        in={showForms}
        timeout={300}
        classNames="form-display"
        unmountOnExit
      >
        <div className="scrim-forms">
          <CreateScrimForm />
          <FindScrimForm data={searchData} callback={findScrimCallback} />
        </div>
      </CSSTransition>
      <br />
      {debugMode ? <DebugDisplay data={searchData} /> : <ScrimDisplay data={searchData} />}
      <div className="footer"><button className="enter-debug-button" onClick={() => updateDebugMode(!debugMode)}>Enter Debug Mode</button></div>
    </div>
  );
}

export default App;
