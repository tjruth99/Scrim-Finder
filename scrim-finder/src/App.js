import React from "react";
import "./App.css";

import FindScrimForm from "./components/FindScrimForm";
import CreateScrimForm from "./components/CreateScrimForm";

function App() {
  return (
    <div className="App">
      <CreateScrimForm />
      <br />
      <FindScrimForm />
    </div>
  );
}

export default App;
