import React, { Component } from 'react';
import '.././styles/About.css';

class About extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <section className="about">
        <h5 className="about-header"><strong>What is <em>Feed the Cat?</em></strong></h5>
          <div className="about-description">
          <p>Well, I'm glad you asked. Feed the Cat is a <a href="http://pomodorotechnique.com" target="_blank">Pomodoro Timer</a>, designed to help you boost productivity and master time-management.</p>

          <p>You simply start by <strong>selecting a task</strong>, or <strong>create one</strong> if this is your first time.</p>

          <p>After you've selected the task you wish to focus on, <strong>start a work session</strong> by pressing the 'Start Session' button.
          The cute little cat will begin stuffing his face with delicious mice, whilst you work away on your project. During this time
          you can not give in to <strong><em>any distractions.</em></strong> Any distraction that pops up during this time must be written down and dealt with later.</p>

          <p>After your 25 minute session, you are rewarded with a <strong>5 minute break</strong> to do <em>anything</em> you wish. Anything <em>except work/think about work. </em>
          That is the most important part.</p>

          <p>After successfully completing <strong>4 successive work sessions</strong>, you are rewarded with a <strong>30 minute break</strong> for your efforts.</p>

          <p>Repeat this cycle to see your productivity shoot through the roof, as well as your kitty's waistline.</p>

        </div>
      </section>

    )
  }


}

export default About;
