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
      'Add Student': () =>  //Redux Action Create 
      'Remove Student': () => //Redux Action Create
      'Clock Student In': () => //Redux Action Create
      'Clock Student Out': () => //Redux Action Create
      'Print Timesheet': () => //Redux Action Create
     }
     return ( menu[menuSelect] || menu['default'] ) () ; 
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

