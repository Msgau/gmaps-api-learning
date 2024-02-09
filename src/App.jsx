import React, { useState } from "react";
import "./App.css";
import Intro from './pages/maps'
import Introv2 from "./pages/mapsv2";
import Places from "./pages/mapsV3";

function App() {
  const [version, setVersion] = useState("V1");

  const handleVersionChange = (selectedVersion) => {
    setVersion(selectedVersion);
  };

  return (
    <>
      <div className="version">
        <h2 onClick={() => handleVersionChange("V1")}>V1</h2>
        <h2 onClick={() => handleVersionChange("V2")}>V2</h2>
        <h2 onClick={() => handleVersionChange("V3")}>V3</h2>
      </div>
      {version === "V1" ? (
        <Intro />
      ) : version === "V2" ? (
        <Introv2 />
      ) : (
        <Places />
      )}
    </>
  );
}

export default App;
