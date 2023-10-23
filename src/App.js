import "./App.css";
import HouseViewer from "./components/HouseViewer";
import React, { useState } from "react";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <div className="App">
      <LoadingBar
        color="#87CEEB"
        height={4}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <HouseViewer setProgress={setProgress} />
    </div>
  );
}

export default App;
