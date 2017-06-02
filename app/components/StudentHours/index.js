/*
 *
 * This is the dashboard for when a student logs in 
 * 
 * */

import React from 'react';

export default class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
    super(props);
  }

    
  render() {
    return (
      <div>
         <h1>You last clocked in on 3/10/2017, for a total worked of 5 hours </h1>
         <h1>Today you clocked in at: _________ </h1>
         <h1>Your gross pay for this pay-periord is $100 </h1>
      </div>
    );
  }
}
