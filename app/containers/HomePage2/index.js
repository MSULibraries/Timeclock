/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

export default class HomePageSecond extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <div>
       <h1>YOU MADE IT</h1>
        <Link to = "/">Click to go Back</Link> 
      </div>
    );
  }
}
