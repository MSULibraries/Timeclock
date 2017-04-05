import React from 'react';
import { Link, browserHistory } from 'react-router';
import ViewHours from '../ViewHours';
import UpdateInfo from '../UpdateInfo';
import RemoveStudent from '../RemoveStudent';

var myStudents = { 
  studentNames: [
     {name: 'Bob Dickinson', id: '903-544-349', hoursUsed: 100, hoursRemain: 10 },
     {name: 'Eugine Smith', id: '905-808-119', hoursUsed: 40, hoursRemain: 20 }
    ]
};

export default class Supervisor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      this.open = this.open.bind(this);
      this.state = { student: '', hoursUsed: 0, hoursRemain: 0, flag: false };
  }
  
  open(id, used, remain){
    this.setState({ student: id });
    this.setState({ hoursUsed: used });
    this.setState({ hoursRemain: remain });
    this.setState({ flag: true });
  }

  render() {
    return (
        <div>
        {myStudents.studentNames.map( (current, index) =>
          <div key = {index} > 
            <h1 onClick = { () => this.open(current.id, current.hoursUsed, current.hoursRemain) } >Name: {current.name}</h1> 
          </div>
          )}
         <ViewHours hoursUsed = {this.state.hoursUsed} hoursRemain = {this.state.hoursRemain} />
          <UpdateInfo student ={this.state.student} />
          <RemoveStudent student ={this.state.student} />
        </div>
    );
  }
}
