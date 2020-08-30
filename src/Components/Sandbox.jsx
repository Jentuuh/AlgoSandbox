import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import rough from "roughjs/bundled/rough.esm";
import Cell from "./Cell";
import "../Styling/Sandbox.css";
import { toolContext } from "./Contexts/ToolContext.ts";
import { useContext } from "react";
import ActionPanel from "./ActionPanel";

/* @author jentevandersanden
 * This functional component represents the sandbox in which the algorithm will be visualized.
 * The Sandbox component uses the Cell component in this example. (Shortest path visualizer)
 */
const Sandbox = () => {
  // Component State
  const [content, setContent] = useState(null);
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(16);

  const equipedTool = useContext(toolContext);

  // Only call this on first render (We initialize the cells on first render)
  useEffect(() => {
    initializeCells(width, height);
  }, []);

  // Initialize array (note that we save the cells in
  // a 1-dimensional array, although we keep the index
  // saved in the cell object so we can figure out in
  // which exact row and column the cell belongs later.)
  const initializeCells = (n, m) => {
    let cellsArray = new Array(n * m);

    for (let i = 0; i < n * m; i++) {
      // Save cells
      cellsArray[i] = { width: 50, height: 50, index: i, state: "Empty" };
    }
    // Return the grid's data
    setContent(cellsArray);
  };

  // Function to dynamically render the width and height of the sandbox,
  // depending on the width and height set in this component's state.
  const getSandboxStyle = () => {
    // Parse the height and the width in the state into styling strings
    let resultwidth = 50 * width;
    resultwidth = String(resultwidth) + "px";
    let resultheight = 50 * height;
    resultheight = String(resultheight) + "px";

    let result = { width: resultwidth, height: resultheight };
    return result;
  };

  // Removes a previous occurence of a certain tool in the cell data
  const removeToolFromCellData = (toolToRemove, cellData, length) => {
    // The array is unsorted (there is no order on the elements), so we need to perform linear search
    for (let i = 0; i < length; i++) {
      if (cellData[i].state === toolToRemove.tool.name) {
        // Remove the previous position of the tool
        cellData[i].state = "Empty";
      }
    }
  };

  /*
   * onClick callback that's called when a cell is clicked.
   */
  const cellWasClicked = (index) => {
    // Check if we're in fact using any tool
    if (equipedTool.tool.name === undefined) {
      console.log("Currently not using any tool.");
      return;
    } else {
      // Make a copy of the cell data
      let cellsCopy = [...content];
      // Remove previous position of used tool
      removeToolFromCellData(equipedTool, cellsCopy, cellsCopy.length);

      // Place new tool on index position
      cellsCopy[index].state = equipedTool.tool.name;

      // Update state
      setContent(cellsCopy);
    }
  };

  // Given the weights and the already processed nodes,
  // find the node with the lowest weight
  const findCheapestNode = (weights, processed) => {
    const currentlyKnown = Object.keys(weights);

    const cheapestNode = currentlyKnown.reduce((lowest, node) => {
      if (lowest === null && !processed.includes(node)) {
        lowest = node;
      }
      if (weights[node] < weights[lowest] && !processed.includes(node)) {
        lowest = node;
      }
      return lowest;
    }, null);
    return cheapestNode;
  };

  // Dijkstra's algorithm, which finds the optimal path between 2 nodes
  const dijkstra = (graph) => {
    // We want to find the lowest cost to each node
    const weights = Object.assign({ finish: Infinity }, graph.start);

    // Consider each node as a possible parent
    const parents = { finish: null };
    for (let child in graph.start) {
      parents[child] = "start";
    }

    // The nodes that have already been processed (none so far)
    const processed = [];

    let node = findCheapestNode(weights, processed);

    // We'll use that node as the key to the while loop,
    // this loop will continuously look for the cheapest node.
    while (node) {
      // Get weight of current node
      let weight = weights[node];

      // Get all neighbours of the current node (at most 8)
      let children = graph[node];

      /* Loop through each child, calculate the weight
       * to reach that child. We'll only update the weight of that
       * node in the 'weights'-object if it's the lowest or only available
       * weight.
       */

      for (let n in children) {
        let possibleNewWeight = weight + children[n];
        if (!weights[n] || weights[n] > possibleNewWeight) {
          weights[n] = possibleNewWeight;
          parents[n] = node;
        }
      }

      // Push processed data
      processed.push(node);
      // Repeat until we processed each node
      node = findCheapestNode(weights, processed);
    }

    let optimalPath = ["finish"];

    let parent = parents.finish;

    while (parent) {
      optimalPath.unshift(parent);
      parent = parents[parent]; // Add parent to start of path
      // (Note that we're actually running through the path from back to front)
    }
    const results = {
      distance: weights.finish,
      path: optimalPath,
    };

    return results;
  };

  return (
    <div className="sandbox" style={getSandboxStyle()}>
      <ActionPanel />
      {content ? (
        <div>
          {content.map((cell, index) => (
            <Cell
              key={index}
              index={index}
              cell={cell}
              state={content[index].state}
              clickFunction={cellWasClicked}
            />
          ))}
        </div>
      ) : (
        "No content available."
      )}
    </div>
  );
};
export default Sandbox;
