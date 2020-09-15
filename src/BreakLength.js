import React from "react";

export const BreakLength = (props) => {
  return (
    <div id="break-section">
      <div id="break-label">Break Length</div>

      <span className="up-arrow" id="break-increment" onClick={props.incrementBreak}>
      &uarr;
      </span>
      <span id="break-length">{props.breakLength}</span>
      <span className="down-arrow" id="break-decrement" onClick={props.decrementBreak}>
      &darr;
      </span>
    </div>
  );
};

export default BreakLength;
