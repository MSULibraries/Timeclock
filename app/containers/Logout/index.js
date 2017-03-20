import React from 'react';
import { Link } from 'react-router';

export default class Logout extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
    super(props);
  }

    
  render() {
    return (
      <div>
        <h1>You've logged out</h1>
        <Link to = "/">Click here to log back in</Link> 
      </div>
    );
  }
}
