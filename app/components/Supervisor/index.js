import React from 'react';
import { Link, browserHistory } from 'react-router';
import AddStudent from '../AddStudent';

export default class Supervisor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      this.menu = this.menu.bind(this);
      //this.state = {x: '' };
      this.state = {flag: false, option: '' };
  }
  
  menu(e){
    //console.log(e.target.innerHTML );
    this.setState({ flag: false });
    let menuSelect = e.target.innerHTML;
    var menu = {
      'Add Student': () =>  this.setState({ option: 'Add Student' }),
      'Remove Student': () => this.setState({ option: 'Remove Student' }),
      'Clock Student In': () => this.setState({ option: 'Clock Student In' }),
      'Clock Student Out': () => this.setState({ option: 'Clock Student Out' }),
      'Print Timesheet': () => this.setState({ option: 'Print Timesheet' }),
      'default': () => console.log('def')
     }
    this.setState({ flag: true })
     return ( menu[menuSelect] || menu['default'] ) () ; 
  }

  render() {
    
    return (
      <div>
        <div onClick = { this.menu } >
          <h2>Add Student</h2>
          <h2>Remove Student</h2>
          <h2>Clock Student In</h2>
          <h2>Clock Student Out</h2>
          <h2>Print Timesheet</h2>
        </div>
        { this.state.flag ?  
         <div> 
           <AddStudent option = {this.state.option} /> 
        </div>  : ''
       }
      </div>
    );
  }
}
