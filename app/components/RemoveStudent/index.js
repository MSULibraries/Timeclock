import React from 'react';

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
      <div>
       <h1 onClick = {this.remove}>Remove Student: {this.props.student}</h1>
      </div>
    );
  }
}