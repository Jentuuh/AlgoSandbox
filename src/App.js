import React, { useLayoutEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import rough from 'roughjs/bundled/rough.esm'

/* @author: jentevandersanden
* This is the main functional component in this application.
*
*/

const generator = rough.generator();


/* Draws a grid of cells 
* @params => x: left coordinate of grid, y: top coordinate of grid
*            n: amount of rows, m: amount of columns
*/
function drawCells(x, y, n, m, canvas){

  // Initialize 2D-array
  const roughCells = new Array(n);

  for(let i = 0; i < n; i++){
    roughCells[i] = new Array(m);
  }

  let x_offset = 0;
  let y_offset = 0;

  for(let i = 0; i < n; i++){
    for(let j = 0; j < m; j++){
      // Save and draw cells
      roughCells[i][j] = generator.rectangle(x+x_offset, y+y_offset, 50,50);
      canvas.draw(roughCells[i][j]);
      // Next cell in the row
      x_offset += 50;
    }
    // Start a new row
    x_offset = 0;
    y_offset+= 50;
  }
  // Return the grid's data
  return roughCells;
}

const App = () => {
  const [cells, setCells] = useState([]);
  const [usingTool, setUsingTool] = useState(null);


  // DOM needs to be ready before this is called
  useLayoutEffect(() => {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    // Clear the rectangle every time we re-render it
    ctx.clearRect(0,0, canvas.width, canvas.height);

    const rough_canvas = rough.canvas(canvas);

    // Drawing code
    const cellsobject = drawCells(10,10,4,4, rough_canvas);
    
  });


  const handleMouseDown = (event) =>{
    // If we're currently using a tool, use that tool on the cell we're currently pointing at
    // if(!usingTool)
    //   return;
  }


  return (<canvas id="canvas" 
                  width={window.innerWidth} 
                  height={window.innerHeight}
                  onMouseDown={handleMouseDown}
                  ></canvas>);

};

export default App;
