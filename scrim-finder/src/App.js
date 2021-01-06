import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./App.css";

import FindScrimForm from "./components/FindScrimForm";
import CreateScrimForm from "./components/CreateScrimForm";
import ScrimDisplay from "./components/ScrimDisplay";

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
  const [refreshData, updateRefreshData] = useState(false);
  const [showForms, updateShowForms] = useState(false);
  const [debugMode, updateDebugMode] = useState(false);

  // Callback function to get search data when user searches for a scrim
  const findScrimCallback = (data) => {
    updateSearchData(data);
  };

  // Callback function to refresh display when a scrim is created
  const refreshDataCallBack = (value) => {
    updateRefreshData(value);
  }

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
          <CreateScrimForm refreshCallback={refreshDataCallBack}/>
          <FindScrimForm data={searchData} callback={findScrimCallback} />
        </div>
      </CSSTransition>
      <br />
      <ScrimDisplay 
        searchData={searchData} 
        refresh={refreshData} 
        refreshCallback={refreshDataCallBack}
        isDebug={debugMode}
      />
      <div className="footer"><button className="enter-debug-button" onClick={() => updateDebugMode(!debugMode)}>{debugMode ? "Exit Debug Mode" : "Enter Debug Mode"}</button></div>
    </div>
  );
}

export default App;
