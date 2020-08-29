import React, { useLayoutEffect, useState, createContext } from 'react';
import './App.css';
import Sandbox from './Components/Sandbox';
import ToolBox from './Components/ToolBox';
import ToolContext from './Components/Contexts/ToolContext';

/* @author: jentevandersanden
* This is the main functional component in this application.
*/


const App = () => {
  const [equipedTool, setEquipedTool] = useState(null);

  return (
  <div className="App">
      <ToolContext.Provider value={equipedTool}>
        <div>
          <ToolBox/>
          <Sandbox/>
        </div>
      </ToolContext.Provider>
  </div>
  );

};

export default App;
