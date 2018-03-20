import React, { Component } from 'react';
import './App.css';
import Timer from './components/Timer'
import Tasks from './components/Tasks'
import About from './components/About'
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBPK_cO8qETo0n0pb-UgIRhfzHWHcbclWs",
  authDomain: "feedthecat-moto.firebaseapp.com",
  databaseURL: "https://feedthecat-moto.firebaseio.com",
  projectId: "feedthecat-moto",
  storageBucket: "feedthecat-moto.appspot.com",
  messagingSenderId: "314349048166"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeTask: ''
    }
    this.activeTask = this.activeTask.bind(this)
  }

  activeTask(task) {
    this.setState({ activeTask: task })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title text-center">FEED THE CAT!</h1>
        </header>


        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <About />
            </div>
              <div className="col-md-4">
                <Tasks
                  firebase={firebase}
                  activeTask={this.activeTask} />

              </div>


              <div className="col-md-5 no-gutters">
               <Timer key="index"
                      activeTask={this.state.activeTask.name}/>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
