import React from 'react';
import { Link, browserHistory } from 'react-router';
import StudentControl from '../AddStudent';

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
      'View Students': () => this.setState({ option: <StudentControl option = "Remove" /> }),
      /*
      'Clock Student In': () => this.setState({ option: <Clock option = "in" /> }),
      'Clock Student Out': () => this.setState({ option: <Clock option = "out"/> }),
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
