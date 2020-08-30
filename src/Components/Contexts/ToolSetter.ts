import * as React from "react";
import { ToolContext } from "./ToolContext";

// This provides a setter for the ToolContext
export const useTool = (): ToolContext => {
  const [tool, setTool] = React.useState(Object);

  const setCurrentTool = React.useCallback((currentTool: object): void => {
    setTool(currentTool);
  }, []);
  return {
    tool,
    setCurrentTool,
  };
};
