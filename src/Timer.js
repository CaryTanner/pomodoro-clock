import React from "react";


export const Timer = (props) => {
  return (
    <div id="timer-section">
      <div id="time-left">{`${props.minutes}` + ":" + `${props.seconds}`}</div>
      <span id="timer-label">{props.currentPhase}</span>
      <span className="clickable" id="start_stop" onClick={props.startStop}>
        &#9654; <span id="pause-button">&#9612;</span><span id="pause-button-right">&#9612;</span>
       
      </span>
      <span id="reset" onClick={props.reset}>
      &#8617;
      </span>
    </div>
  );
};
