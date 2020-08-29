import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import rough from 'roughjs/bundled/rough.esm';
import Cell from './Cell'
import '../Styling/Sandbox.css'
import ToolContext from './Contexts/ToolContext'

/* @author jentevandersanden
* This functional component represents the sandbox in which the algorithm will be visualized.
* The Sandbox component uses the Cell component in this example. (Shortest path visualizer)
*/
const Sandbox = () => {
    // Component State
    const [content, setContent] = useState(null);
    const [width, setWidth] = useState(4);
    const [height, setHeight] = useState(4);
    const [equipedTool, setEquipedTool] = useState(null);
    let tool_in_use = null;

    // Only call this on first render (We initialize the cells on first render)
    useEffect(()=>{
        initializeCells(4,4);
    },[])

    const generator = rough.generator();

    /* Draws a grid of cells 
    * @params => x: left coordinate of grid, y: top coordinate of grid
    *            n: amount of rows, m: amount of columns
    */
    const initializeCells = (n, m) => {

        // Initialize array (note that we save the cells in 
        // a 1-dimensional array, although we keep the index
        // saved in the cell object so we can figure out in 
        // which exact row and column the cell belongs later.)
        let cellsArray = new Array(n * m);

    
        for(let i = 0; i < n * m; i++){
            // Save cells
            cellsArray[i]  = {  width: 50,
                                height: 50,
                                index: i
                             } ;
        }
        // Return the grid's data
        setContent(cellsArray);
    }

    // Function to dynamically render the width and height of the sandbox,
    // depending on the width and height set in this component's state.
    const getSandboxStyle = () =>{
        // Parse the height and the width in the state into styling strings
        let resultwidth = 50 * width;
        resultwidth = String(resultwidth) + 'px';
        let resultheight = 50 * height;
        resultheight = String(resultheight) + 'px';
        
        let result = {  width: resultwidth,
                        height: resultheight}
        return result;
    }

    /*
    * onClick callback that's called when a cell is clicked.
    */
    const cellWasClicked = (index) =>{
      if(tool_in_use === null){
          console.log("Currently not using any tool.");
          return;
      } 
    }


    return ( <div className="sandbox" style={getSandboxStyle()}> 
                <ToolContext.Consumer>
                    {(context)=>(
                        tool_in_use = context
                    )}
                </ToolContext.Consumer>
                {content ? (
                    <div>
                        {content.map((cell, index) =>(
                            <Cell
                                key={index}
                                index={index}
                                cell={cell}
                                cellWasClicked={cellWasClicked}/>
                        ))}
                    </div>
                ) : "No content available."}
            </div>);
} 
export default Sandbox;