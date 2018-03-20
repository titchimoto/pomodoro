import React, { Component } from 'react';
import buzz from 'buzz'
import '.././styles/Timer.css';

const mySound = new buzz.sound('/sounds/ding.mp3');

class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {
      timeRemaining: 1500,
      breakTimeRemaining: 300,
      onBreak: true,
      completedSessions: 0,
      restart: false
    };
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  stopTimer(){
    this.setState({ onBreak: true, restart: true })
    clearInterval(this.interval);
  }

  startTimer(time){
    this.setState({ onBreak: false, restart: true })
    if (this.state.completedSessions === 4) {
      this.setState({ completedSessions: 0 })
    }

    this.setState({ timeRemaining: time })
    clearInterval(this.interval);

    this.interval = setInterval(
      () => {
        if (this.state.timeRemaining > 0) {
          this.setState(prevState => ({ timeRemaining: prevState.timeRemaining - 1 }))
        } else {
          mySound.play();
          this.state.completedSessions === 3 ? this.setState({ timeRemaining: 1800 }) : this.setState({ timeRemaining: 300 })
          this.setState({ onBreak: true, completedSessions: this.state.completedSessions + 1, restart: false })
          clearInterval(this.interval);
        }
      }, 1000
    )
  }


  startBreakTimer(time){
    this.setState({ timeRemaining: time })
    clearInterval(this.interval);

    this.interval = setInterval(
      () => {
        if (this.state.timeRemaining > 0) {
          this.setState(prevState => ({ timeRemaining: prevState.timeRemaining - 1 }))
        } else {
          mySound.play();
          this.setState({ timeRemaining: 1500, onBreak: true })
          clearInterval(this.interval);
        }
      }, 1000
    )
  }


  formatTime(timeInS){
    let seconds = Math.floor(timeInS % 60)
    let minutes = Math.floor(timeInS / 60)
    seconds < 10 ? seconds = "0" + seconds : seconds
    minutes < 10 ? minutes = "0" + minutes : minutes
    return minutes + ":" + seconds
  }

  render(){
    let newSession = null;
    let breakTime = null;
    let initial = null;
    let kitty = null;

    if (this.state.timeRemaining <= 1500 && this.state.restart === true) {
        newSession = <div>
                       <p><button className="btn btn-danger" onClick={ (e) => this.startTimer(1500) }>Restart Session</button></p>
                     </div>
    } else if (this.state.timeRemaining === 1500 && this.state.onBreak === true) {
        newSession = <div>
                       <p><button className="btn btn-success" onClick={ (e) => this.startTimer(1500) }>Start Session</button></p>
                     </div>
    }

  if (this.state.completedSessions % 4 === 0 && this.state.timeRemaining === 1800 && this.state.onBreak === true) {
    breakTime = <div>Congratulations on completing 4 successive work sessions. Here, enjoy a 30 minute break to celebrate!
                  <p><button className="btn btn-success" onClick={ (e) => this.startBreakTimer(1800) }>Start Break</button></p>
                </div>
    } else if (this.state.timeRemaining === 300 && this.state.onBreak === true) {
      breakTime = <div>
                    <p><button className="btn btn-success" onClick={ (e) => this.startBreakTimer(300) }>Start Break</button></p>
                  </div>
    }

    if (!this.props.activeTask) {
    initial = <h5>Select a Task, or create a new one to get started.</h5>
  } else {
    initial = <div>
                Working on...
                <h1>{this.props.activeTask}</h1>
              </div>
  }

  if (this.state.onBreak) {
    kitty = <img src="images/sleeping.gif" alt="Sleeping Cat Animation" />
  } else {
    kitty = <img src="images/eating.gif" alt="Eating Cat Animation" />
  }


    return(
      <section className="timer-container">
      {initial}

        <div id="timer">{this.formatTime(this.state.timeRemaining)}</div>

        {breakTime}
        {newSession}
        Consecutive Completed Work Sessions: { this.state.completedSessions || 0 }
        <p><small>(Complete 4 in a row to earn a well-deserved 30 minute break!)</small></p>

        <div>
          {kitty}
        </div>
        <div className="stop-session">
          <button className="btn btn-danger btn-sm" onClick={ (e) => this.stopTimer() }>Stop Timer</button>
          <p><small>Need to stop? Remember, you will have to start your session over!</small></p>
        </div>

      </section>
    );
  }
}


export default Timer;
