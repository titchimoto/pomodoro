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
    // this.interval = setInterval(
    //   () => {
    //     if (this.state.timeRemaining > 0) {
    //       this.setState(prevState => ({ timeRemaining: prevState.timeRemaining - 1 }))
    //     } else {
    //       clearInterval(this.interval);
    //     }
    //   }, 1000
    // )
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }



  stopTimer(){

  }

  startTimer(){
    this.setState({ timeRemaining: this.state.timeRemaining })
    clearInterval(this.interval);
    this.interval = setInterval(
      () => {
        if (this.state.timeRemaining > 0) {
          this.setState(prevState => ({ timeRemaining: prevState.timeRemaining - 1 }))
        } else {
          this.setState({ timeRemaining: 300 })
          this.setState({ onBreak: true })
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
          this.setState({ timeRemaining: 1500 })
          this.setState({ onBreak: false })
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
        newSession = <div>Want to restart your existing session?
                       <p><button onClick={ (e) => this.startTimer(e) }>Restart</button></p>
                     </div>
    } else if (this.state.timeRemaining === 1500) {
        newSession = <div>Ready to start another session?
                       <p><button onClick={ (e) => this.startTimer(e) }>Start</button></p>
                     </div>
    }

    if (this.state.timeRemaining === 300) {
      breakTime = <div>Ready for that well earned break?
                    <p><button onClick={ (e) => this.startBreakTimer(e) }>Start Break</button></p>
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
