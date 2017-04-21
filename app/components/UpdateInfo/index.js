import React from 'react';
import AddStudent from '../AddStudent';

export default class UpdateInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      //this.state = {x: '' };
  }
    
  render() {
    return (
      <div>
        <AddStudent option = "Add" />
      </div>
    );
  }
}