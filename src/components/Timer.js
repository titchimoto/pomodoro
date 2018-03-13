import React, { Component } from 'react';

class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {
      timeRemaining: 3,
      breakTimeRemaining: 4,
      completedSessions: 0,
      completedFiveMinuteBreaks: 0
    };
  }

  componentDidMount(){
    this.interval = setInterval(
      () => {
        if (this.state.timeRemaining > 0) {
          this.setState(prevState => ({ timeRemaining: prevState.timeRemaining - 1 }))
        } else {
          clearInterval(this.interval);
        }
      }, 1000
    )
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  startTimer(e){

  }

  stopTimer(){

  }

  resetTimer(){
    this.setState({ timeRemaining: 5 })
    clearInterval(this.interval);
    this.interval = setInterval(
      () => {
        if (this.state.timeRemaining > 0) {
          this.setState(prevState => ({ timeRemaining: prevState.timeRemaining - 1 }))
        } else {
          clearInterval(this.interval);
        }
      }, 1000
    )
  }


  startBreakTimer(){
    this.setState({ timeRemaining: this.state.breakTimeRemaining })
    clearInterval(this.interval);
    this.interval = setInterval(
      () => {
        if (this.state.timeRemaining > 0) {
          this.setState(prevState => ({ timeRemaining: prevState.timeRemaining - 1 }))
        } else {
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
    if (this.state.timeRemaining > 0) {
        newSession = <div>Want to restart your existing session?
                       <button onClick={ (e) => this.resetTimer(e) }>Restart</button>
                     </div>
    } else {
        newSession = <div>Ready to start another session?
                       <button onClick={ (e) => this.resetTimer(e) }>Start</button>
                     </div>
    }

    if (this.state.timeRemaining === 0) {
      breakTime = <div>Ready for that well earned break?
                    <button onClick={ (e) => this.startBreakTimer(e) }>Start Break</button>
                  </div>
    }

    return(
      <div>
        {this.formatTime(this.state.timeRemaining)}

        {breakTime}
        {newSession}

      </div>
    );
  }
}


export default Timer;
