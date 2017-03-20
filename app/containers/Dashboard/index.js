
import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Graph from '../../components/Graph/index.js';
import StudentHours from '../../components/StudentHours/index.js';
import Supervisor from '../../components/Supervisor/index.js';
var date = new Date();

export default class HomePageSecond extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <div>
        <h1>Hello Justin, today is { date.getMonth() }/{ date.getDate() }/{ date.getFullYear() }</h1>
         <Graph /> 
        {/* <StudentHours /> */}
        <Supervisor />
        <Link to = "/Logout">Click to logout</Link> 
      </div>
    );
  }
}
 