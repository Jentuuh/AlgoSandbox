import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import rough from 'roughjs/bundled/rough.esm';
import Cell from './Cell'

const Sandbox = () => {
    // Content within the sandbox
    const [content, setContent] = useState();
    

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
        console.log(cellsArray);
        setContent(cellsArray);

    }


    return ( <div className="sandbox">
                {content ? (
                    <div>
                    {content.map((cell, index) =>(
                        <Cell
                            key={index}
                            index={index}
                            cell={cell}/>
                    ))}
                    </div>
                ) : "No content available."}
            </div>);
}
 
export default Sandbox;