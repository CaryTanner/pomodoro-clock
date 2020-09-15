import React from "react";
import Pomodoro from "./PomodoroTitle";
import "./index.css";
import { BreakLength } from "./BreakLength";
import { SessionLength } from "./SessionLength";
import { Timer } from "./Timer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      timer: 1500,
      running: false,
      currentPhase: "Session",
      minutes: 25,
      seconds: "00",
    };

    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.startStop = this.startStop.bind(this);
    this.reset = this.reset.bind(this);
    this.clockTime = this.clockTime.bind(this);
    this.switchPhase = this.switchPhase.bind(this);
    this.playAlarm = this.playAlarm.bind(this);
    this.resetAlarm = this.resetAlarm.bind(this);
  }

  incrementSession() {
    if (this.state.running || this.state.sessionLength === 60) {
      return;
    } else {
      this.setState((state) => ({
        sessionLength: state.sessionLength + 1,
        timer: (state.sessionLength + 1) * 60,
        currentPhase: "Session",
        minutes: state.sessionLength + 1,
        seconds: "00",
      }));
    }
  }

  decrementSession() {
    if (this.state.running || this.state.sessionLength === 1) {
      return;
    } else {
      this.setState((state) => ({
        sessionLength: state.sessionLength - 1,
        timer: (state.sessionLength - 1) * 60,
        currentPhase: "Session",
        minutes: state.sessionLength - 1,
        seconds: "00",
      }));
    }
  }

  incrementBreak() {
    if (this.state.running || this.state.breakLength === 60) {
      return;
    } else {
      this.setState((state) => ({
        breakLength: state.breakLength + 1,
      }));
    }
  }

  decrementBreak() {
    if (this.state.running || this.state.breakLength === 1) {
      return;
    } else {
      this.setState((state) => ({
        breakLength: state.breakLength - 1,
      }));
    }
  }

  startStop() {
    if (this.state.running) {
      clearInterval(this.timerID);
      this.setState((state) => ({
        running: false,
      }));
    } else {
      this.timerID = setInterval(() => this.countDown(), 1000);
      this.setState((state) => ({
        running: true,
      }));
    }
  }

  countDown() {
    this.setState((state) => ({
      timer: state.timer - 1,
    }));
  }

  resetAlarm() {
    document.querySelector("#beep").currentTime = 0;
    document.querySelector("#beep").pause();
  }

  reset() {
    clearInterval(this.timerID);
    this.resetAlarm();
    this.setState((state) => ({
      sessionLength: 25,
      breakLength: 5,
      timer: 1500,
      running: false,
      currentPhase: "Session",
      minutes: 25,
      seconds: "00",
    }));
  }

  switchPhase() {
    if (this.state.currentPhase === "Session") {
      this.setState((state) => ({
        currentPhase: "Break",
        timer: state.breakLength * 60,
      }));
    } else {
      this.setState((state) => ({
        currentPhase: "Session",
        timer: state.sessionLength * 60,
      }));
    }
  }

  playAlarm() {
    document.querySelector("#beep").play();
  }

  clockTime() {
    if (parseInt(this.state.timer / 60) < 10 && this.state.timer % 60 < 10) {
      this.setState((state) => ({
        minutes: "0"`${parseInt(this.state.timer / 60)}`,
        seconds: "0"`${this.state.timer % 60}`,
      }));
    } else if (parseInt(this.state.timer / 60) < 10) {
      this.setState((state) => ({
        minutes: "0"`${parseInt(this.state.timer / 60)}`,
        seconds: `${this.state.timer % 60}`,
      }));
    } else if (this.state.timer % 60 < 10) {
      this.setState((state) => ({
        seconds: "0" + `${this.state.timer % 60}`,
      }));
    } else {
      this.setState((state) => ({
        minutes: `${parseInt(this.state.timer / 60)}`,
        seconds: `${this.state.timer % 60}`,
      }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.timer !== this.state.timer && this.state.timer < 0) {
      this.switchPhase();
      this.playAlarm();
    }
    if (prevState.timer !== this.state.timer) {
      this.clockTime();
    }
  }

  render() {
    return (
      <div>
        <div id="logo-section">
          <Pomodoro animate={this.state.running} />
        </div>

        <Timer
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          currentPhase={this.state.currentPhase}
          startStop={this.startStop}
          reset={this.reset}
        />

        <div id="length-container">
          <SessionLength
            incrementSession={this.incrementSession}
            decrementSession={this.decrementSession}
            sessionLength={this.state.sessionLength}
          />
          <BreakLength
            incrementBreak={this.incrementBreak}
            decrementBreak={this.decrementBreak}
            breakLength={this.state.breakLength}
          />
        </div>
        <audio
          id="beep"
          src="http://dight310.byu.edu/media/audio/FreeLoops.com/1/1/Alarm%20Clock.wav-19830-Free-Loops.com.mp3"
        ></audio>
      </div>
    );
  }
}

export default App;
