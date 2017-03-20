import React from 'react';

export default class Supervisor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      //this.state = {x: '' };
  }
    
  render() {
    return (
      <div>
        <h1>This is a test of the Supervisor component</h1>
      </div>
    );
  }
}