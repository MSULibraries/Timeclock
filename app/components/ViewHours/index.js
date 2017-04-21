import React from 'react';
import StudentGraph from '../StudentGraph';

export default class ViewHours extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      //this.state = {x: '' };
  }

    
  render() {
    return (
      <div>
        <StudentGraph budgetUsed = {this.props.hoursUsed} budgetRemain = {this.props.hoursRemain} />
      </div>
    );
  }
}