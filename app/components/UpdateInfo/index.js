import React from 'react';

export default class UpdateInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      //this.state = {x: '' };
  }
    
  render() {
    return (
      <div>
        <h1>Update the students info {this.props.student}</h1>
      </div>
    );
  }
}