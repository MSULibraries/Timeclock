import React from 'react';
import Student from '../Student';

export default class ViewStudent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      //this.state = {x: '' };
      this.state = {students: { }, flag: false };
  }
  
  render() {
    return (
      <div>
       {this.props.students.studentNames.map( (currentValue,index) => 
         <Student key = {index} name = {currentValue.name} />
       )} {/* end map */}
      </div>
    ); //end return
  } // end Render method
} // End component class

