import React from "react";
import "../Styling/ToolIcon.css";
import { useDrag } from "react-dnd";
import { ToolTypes } from "../App";

const Tool = ({ tool, index, clickOnTool }) => {

  return (
    <img
      className="toolIcon"
      src={tool.toolIcon}
      onClick={() => clickOnTool(tool)}
      alt={tool.name}
    />
  );
};

export default Tool;
