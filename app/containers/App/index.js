/**
 *
 *
 * This app was made in loving memory of my mother Juliet Lucy Samuels
 * whom I lost during the development of this app. She will forever
 * be my inspiraton to strive to reach higher places each and every day. - Justin E. Samuels, June 7, 2017
 * 
 * 
 * 
 * 
 *  Heart-beat of the timeclock
 */

import React from 'react';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      
      <div>
          {React.Children.toArray(this.props.children)}  
        </div>
       
    );
  }
}
