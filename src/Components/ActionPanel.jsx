import React from "react";
import "../Styling/ActionPanel.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ActionPanel = () => {
  return (
    <div className="actionpanel">
      <button type="button" class="btn btn-dark">
        Run Algorithm!
      </button>
    </div>
  );
};

export default ActionPanel;
