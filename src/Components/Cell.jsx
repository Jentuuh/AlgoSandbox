import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import rough from "roughjs/bundled/rough.esm";
import "../Styling/Cell.css";


const Cell = ({ index, cell, state, clickFunction }) => {
  const [usedcanvas, setUsedCanvas] = useState(null);

  const generator = rough.generator();

  /* Draws a cell
   * @params => x: left coordinate of grid, y: top coordinate of grid
   */
  function drawCell(x, y, canvas) {
    switch (state) {
      // START CELL
      case "Start":
        canvas.draw(
          generator.rectangle(x, y, cell.width - 1, cell.height - 1, {
            fill: "red",
          })
        );
        break;

      // FINISH CELL
      case "Finish":
        canvas.draw(
          generator.rectangle(x, y, cell.width - 1, cell.height - 1, {
            fill: "blue",
          })
        );
        break;

      // EMPTY STATE
      default:
        canvas.draw(generator.rectangle(x, y, cell.width - 1, cell.height - 1));
        break;
    }
  }

  // Only call this on first render (We draw the cell on first render)
  useEffect(() => {
    var canvas = document.getElementById(index);
    var ctx = canvas.getContext("2d");

    // Clear the rectangle every time we re-render it
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rough_canvas = rough.canvas(canvas);
    setUsedCanvas(canvas);

    // Drawing code
    drawCell(0, 0, rough_canvas);
  }, [state]);


  return (
    <canvas
      className="cellcanvas"
      id={index}
      width={cell.width}
      height={cell.height}
      onClick={() => {
        clickFunction(index);
      }}
    ></canvas>
  );
};

export default Cell;
