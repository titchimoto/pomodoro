import React, { Component } from 'react';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTaskName: '',
      date: ''
    }
    this.tasksRef = this.props.firebase.database().ref('tasks');
  }


  componentDidMount() {
    this.tasksRef.orderByChild('date').on('child_added', snapshot => {
      const task = snapshot.val();
      task.key = snapshot.key;
      this.setState({ tasks: this.state.tasks.concat(task) })
    });
  }

  componentWillReceiveProps() {

  }

  handleChange(e) {
    this.setState({ newTaskName: e.target.value, date: Date.now() * -1 });
  }


  createTask(e) {
    e.preventDefault();
    if (!this.state.newTaskName) { return }
    this.tasksRef.push({ name: this.state.newTaskName, date: this.state.date })
    this.setState({ newTaskName: '' })
  }

  selectTask(task) {
    this.props.activeTask(task)
  }

  render(){
    console.log(this.state.tasks);


    return(
      <section className="task-container">
        <div id="task-input">
          <form onSubmit={ (e) => this.createTask(e) }>
            <label>Create a Task:</label>
            <input type="text" value={this.state.newTaskName} onChange={ (e) => this.handleChange(e) } />
            <input className="submit-button" type="submit" value="Add Task"/>
          </form>
        </div>


        <div id="task-list">
        {

          this.state.tasks.map( (task, index) =>
            <li className="task-name" key={task.key} onClick={ (e) => this.selectTask(task, e) }>{task.name}
            </li>
        )
      }

        </div>
      </section>

    )
  }




}

export default Tasks;
