import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
//Import Actions for dispatch

//Import selectors for use in getting minimal state from Redux global store
import {  getStudentsOnClock } from '../../containers/App/selectors.js';

//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';


class CurrentStudents extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      //this.state = {x: '' };
  }
    
  render() {
    return (
      <div>
      <h1>Current Students Clocked In:</h1>
      {this.props.studentsOnClock.map( (current, index) => 
        <h2 key = {index}> {current.FirstName} {current.LastName} </h2>
      )
    }  
    </div>
    );
  }
}
//Redux method to allow the props to have access to the Redux global store
//With the least minimal state representation possible through Reselect library
const mapStateToProps = createStructuredSelector({
    studentsOnClock: getStudentsOnClock()
  });
  
 //Redux method to bind the actions created in the component to a dispatch
 export function mapDispatchToProps(dispatch) {
  return {
  };
}
 //Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps,mapDispatchToProps)(CurrentStudents);