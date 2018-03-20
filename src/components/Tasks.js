import React, { Component } from 'react';
import '.././styles/Tasks.css';


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
    this.tasksRef.on('child_added', snapshot => {
      const task = snapshot.val();
      task.key = snapshot.key;
      this.setState({ tasks: this.state.tasks.concat(task) })
    });
  }

  handleChange(e) {
    this.setState({ newTaskName: e.target.value, date: Date.now() });
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

  deleteTask(taskKey, e) {
    e.stopPropagation();
    this.props.firebase.database().ref('tasks/' + taskKey).remove();
    let updateTasks = this.state.tasks
    for (let i = 0; i < updateTasks.length; i++) {
      if(updateTasks[i].key === taskKey) {
        updateTasks.splice(i, 1);
      }
    }
    this.setState({ tasks: updateTasks })
  }

  render(){
    console.log(this.state.tasks)
    let reversedTasks = this.state.tasks.sort(function(a,b){
      return b.date - a.date;
    })


    return(
      <section className="tasks-container">
        <div id="task-input">
          <form onSubmit={ (e) => this.createTask(e) }>
            <input type="text" className="form-control" placeholder="Create a new task..." value={this.state.newTaskName} onChange={ (e) => this.handleChange(e) } />
            <input className="submit-button btn btn-primary btn-block" type="submit" value="Add Task"/>
          </form>
        </div>

        <div id="task-list">

        {
          reversedTasks.map( (task, index) =>
            <li className="list-group-item" key={task.key} onClick={ (e) => this.selectTask(task, e) }>{task.name}
            <button className="btn btn-danger btn-sm float-right" onClick={ (e) => this.deleteTask(task.key, e) }><strong>X</strong></button></li>
        )}

        </div>
      </section>

    )
  }
}

export default Tasks;
