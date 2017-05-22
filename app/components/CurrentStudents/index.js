import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
//Import Actions for dispatch
import {  Action } from './actions' ;

//Import selectors for use in getting minimal state from Redux global store
import { getUser, getStudents, getStudentsOnClock } from '../../containers/App/selectors.js';

//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';


class CurrentStudents extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      //this.state = {x: '' };
  }
  componentWillMount(){
    console.log(this.props.studentsOnClock)
  }
    
  render() {
    return (
      <div>
      {this.props.studentsOnClock.map( (current, index) => 
        <h1 key = {index}>Current Students clocked in: {current.NetID}</h1>
    
      )
    }  
    </div>
    );
  }
}
//Redux method to allow the props to have access to the Redux global store
//With the least minimal state representation possible through Reselect library
const mapStateToProps = createStructuredSelector({
	  user: getUser(),
    student: getStudents(),
    studentsOnClock: getStudentsOnClock()
  });
  
 //Redux method to bind the actions created in the component to a dispatch
 export function mapDispatchToProps(dispatch) {
  return {
    currentStudents: (evt,name,department) => dispatch(Action(evt,name,department))
  };
}
 //Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps,mapDispatchToProps)(CurrentStudents);