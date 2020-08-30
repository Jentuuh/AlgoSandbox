import React, { useLayoutEffect, useState, createContext } from "react";
import "./App.css";
import Sandbox from "./Components/Sandbox";
import ToolBox from "./Components/ToolBox";
import { toolContext } from "./Components/Contexts/ToolContext.ts";
import { useTool } from "./Components/Contexts/ToolSetter.ts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

/* @author: jentevandersanden
 * This is the main functional component in this application.
 */
export const ToolTypes = {
  START: "start",
  FINISH: "finish",
};

const App = () => {
  const tool = useTool();

  return (
    <div className="App">
      <toolContext.Provider value={tool}>
        <div>
          <ToolBox />
          <Sandbox />
        </div>
      </toolContext.Provider>
      <DndProvider backend={HTML5Backend}>...</DndProvider>
    </div>
  );
};

export default App;
