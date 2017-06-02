/*
 *
 * View the students on your timeclock in a list w/ radio buttons
 *
 * */ 
import React from 'react';
import Student from '../Student';

export default class ViewStudent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      this.state = {students: { } };
  }
  //Loops through and renders the student names based off the list recieved in props. 
  render() {
    return (
      <div style = {{marginLeft: '30%' }}>
       {this.props.students.studentNames.map( (currentValue,index) => 
         <Student key = {index} name = {currentValue.name} />
       )} {/* end map */}
      </div>
    ); //end return
  } // end Render method
} // End component class

