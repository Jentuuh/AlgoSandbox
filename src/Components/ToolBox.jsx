import React, { useContext } from "react";
import { useState } from "react";
import Tool from "./Tool";
import "../Styling/Toolbox.css";
import { toolContext } from "./Contexts/ToolContext.ts";

const ToolBox = () => {
  const [tools, setTools] = useState([
    {
      name: "Start",
      description:
        "Use this tool to mark a cell as the end point of your traject.",
      toolIcon: "https://image.flaticon.com/icons/svg/495/495499.svg",
    },
    {
      name: "Finish",
      description:
        "Use this tool to mark a cell as the end point of your traject.",
      toolIcon: "https://image.flaticon.com/icons/svg/783/783470.svg",
    },
  ]);
  const equiped_tool = useContext(toolContext);

  // 'onClick' event callback for when a tool is clicked. This will equip the tool.
  const equipTool = (toolToEquip) => {
    equiped_tool.setCurrentTool(toolToEquip);
  };

  return (
    <div className="toolbox">
      <h2 className="h2">Tools:</h2>
      <h5>
        Currently using:{" "}
        {equiped_tool.tool.name === undefined
          ? "Nothing"
          : equiped_tool.tool.name}
      </h5>
      {tools.map((tool, index) => (
        <Tool key={index} index={index} tool={tool} clickOnTool={equipTool} />
      ))}
    </div>
  );
};

export default ToolBox;
