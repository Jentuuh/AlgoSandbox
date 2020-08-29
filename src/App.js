import React, { useLayoutEffect, useState } from 'react';
import './App.css';
import Sandbox from './Components/Sandbox';
import ToolBox from './Components/ToolBox';

/* @author: jentevandersanden
* This is the main functional component in this application.
*
*/

const App = () => {

  return (
  <div className="App">
    <ToolBox/>
    <Sandbox/>
  </div>
  );

};

export default App;
