import React from 'react';

export default class Supervisor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      this.menu = this.menu.bind(this);
      //this.state = {x: '' };
  }
  
  menu(e){
    //console.log(e.target.innerHTML );
    let menuSelect = e.target.innerHTML;
    var menu = {
      'Add Student': 'Add Student'
    }
    return 'The drink I chose was ' + (drinks[type] || drinks['default']);
 }

  }
   
  render() {
    return (
      <div onClick = { this.menu } >
        <h2>Add Student</h2>
        <h2>Remove Student</h2>
        <h2>Clock Student In</h2>
        <h2>Clock Student Out</h2>
        <h2>Print Timesheet</h2>
      </div>
    );
  }
}

