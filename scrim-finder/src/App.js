import React from "react";
import "./App.css";

import FindScrimForm from "./components/FindScrimForm";
import CreateScrimForm from "./components/CreateScrimForm";
import ScrimDisplay from "./components/ScrimDisplay";

function App() {
  return (
    <div className="App">
      <CreateScrimForm />
      <br />
      <FindScrimForm />
      <br />
      <ScrimDisplay />
    </div>
  );
}

export default App;
