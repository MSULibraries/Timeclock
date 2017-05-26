import React from 'react';
import RemoveStudentStyle from './styles';

export default class RemoveStudent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      this.remove = this.remove.bind(this);
      //this.state = {x: '' };
  }
  
  remove(){
    
  }
    
  render() {
    return (
      <RemoveStudentStyle id="RemoveStudentStyle">  
       <h3 onClick = {this.remove}>Deactivate Student</h3>
      </RemoveStudentStyle>
    );
  }
}