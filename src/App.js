import React, { useLayoutEffect, useState, createContext } from 'react';
import './App.css';
import Sandbox from './Components/Sandbox';
import ToolBox from './Components/ToolBox';
import {toolContext} from './Components/Contexts/ToolContext.ts';
import { useTool } from './Components/Contexts/ToolSetter.ts';

/* @author: jentevandersanden
* This is the main functional component in this application.
*/


const App = () => {
  const tool = useTool();

  return (
  <div className="App">
      <toolContext.Provider value={tool}>
        <div>
          <ToolBox/>
          <Sandbox/>
        </div>
      </toolContext.Provider>
  </div>
  );

};

export default App;
