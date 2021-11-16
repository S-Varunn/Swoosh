import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Upload from "./components/Upload";
import Download from "./components/Download";
function App() {
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route exact path={"/"} element={<Upload />} />
        <Route exact path={"/download"} element={<Download />} />
      </Routes>
    </React.Suspense>
  );
}
export default App;
