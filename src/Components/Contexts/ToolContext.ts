import React from "react";

export interface ToolContext {
  tool: object;
  setCurrentTool: (currentTool: object) => void;
}

// By default we're using no tool
export const TOOL_DEFAULT_VALUE = {
  tool: { name: "Nothing", description: "...", toolIcon: "" },
  setCurrentTool: () => {},
};

export const toolContext = React.createContext<ToolContext>(TOOL_DEFAULT_VALUE);
