import React from "react";

export const SessionLength = (props) => {
  return (
    <div id="session-timer-section">
      <div id="session-label">Session Length</div>

      <span className="up-arrow"
        id="session-increment"
        data-value="1"
        onClick={props.incrementSession}
      >
        &uarr;
      </span>
      <span id="session-length">{props.sessionLength}</span>
      <span className="down-arrow"
        id="session-decrement"
        data-value="-1"
        onClick={props.decrementSession}
      >
        &darr;
      </span>
    </div>
  );
};
