import React, { Component } from 'react';

class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {
      timeRemaining: 1500,
      breakTimeRemaining: 300,
      onBreak: false,
      completedSessions: 0,
      completedFiveMinuteBreaks: 0

    };
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  stopTimer(){

  }

  startTimer(time){
    if (this.state.completedSessions === 4) {
      this.setState({ completedSessions: 0})
    }
    this.setState({ timeRemaining: time })
    clearInterval(this.interval);
    this.interval = setInterval(
      () => {
        if (this.state.timeRemaining > 0) {
          this.setState(prevState => ({ timeRemaining: prevState.timeRemaining - 1 }))
        } else {
          this.state.completedSessions === 3 ? this.setState({ timeRemaining: 1800 }) : this.setState({ timeRemaining: 300 })
          this.setState({ onBreak: true, completedSessions: this.state.completedSessions + 1 })
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
          this.setState({ timeRemaining: 1500, onBreak: false })
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
    if (this.state.timeRemaining < 1500 && this.state.onBreak === false) {
        newSession = <div>Work Session
                       <p><button onClick={ (e) => this.startTimer(1500) }>Restart Session</button></p>
                     </div>
    } else if (this.state.timeRemaining === 1500) {
        newSession = <div>Ready to start another session?
                       <p><button onClick={ (e) => this.startTimer(1500) }>Start Session</button></p>
                     </div>
    }

  if (this.state.completedSessions % 4 === 0 && this.state.timeRemaining === 1800 && this.state.onBreak === true) {
    breakTime = <div>Congratulations on completing 4 successive work sessions. Here, enjoy a 30 minute break to celebrate!
                  <p><button onClick={ (e) => this.startBreakTimer(1800) }>Start Break</button></p>
                </div>
    } else if (this.state.timeRemaining === 2 && this.state.onBreak === true) {
      breakTime = <div>Ready for that well earned break?
                    <p><button onClick={ (e) => this.startBreakTimer(300) }>Start Break</button></p>
                  </div>
    }


    return(
      <div>
        {this.formatTime(this.state.timeRemaining)}

        {breakTime}
        {newSession}
        <p>Consecutive Completed Work Sessions: { this.state.completedSessions || 0 }</p>
        <small>(Complete 4 in a row to earn a well-deserve 30 minute break!)</small>

      </div>
    );
  }
}


export default Timer;
