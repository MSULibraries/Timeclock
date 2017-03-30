import React from 'react';
import { Link, browserHistory } from 'react-router';
import StudentControl from '../AddStudent';
import ViewStudents from '../ViewStudent';

var myStudents = { 
  studentNames: [
     {name: 'Justin Samuels'},
     {name: 'Matt Motes' }
    ]
};

export default class Supervisor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      this.menu = this.menu.bind(this);
      this.state = { option: '' };
  }
  
  menu(e){
    //console.log(e.target.innerHTML );
    let menuSelect = e.target.innerHTML;
    var menu = {
      'Add Student': () =>  this.setState({ option: <StudentControl option = "Add" /> }),
      'View Students': () => this.setState({ option: <ViewStudents students = {myStudents} /> }),
      /*
      'Print Timesheet': () => this.setState({ option: <Print /> }),
      */
      'default': () => console.log('def')
     }
     return ( menu[menuSelect] || menu['default'] ) () ; 
  }

  render() {
    return (
      <div>
        <div onClick = { this.menu } >
          <h2>Add Student</h2>
          <h2>View Students</h2>
          <h2>Print Timesheet</h2>
        </div>
        {this.state.option}
      </div>
    );
  }
}
