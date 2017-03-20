import React from 'react';

export default class Supervisor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      this.sw = this.sw.bind(this);
      //this.state = {x: '' };
  }
  
  sw(e){
    console.log(e.target);
  }
   
  render() {
    return (
      <div >
        <h2 onClick = { this.sw } value = {1}>Add Student</h2>
        <h2>Remove Student</h2>
        <h2>Clock Student In</h2>
        <h2>Clock Student Out</h2>
        <h2>Print Timesheet</h2>
      </div>
    );
  }
}

