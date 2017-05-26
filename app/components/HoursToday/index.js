import React from 'react';
import StudentGraph from '../StudentGraph';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
//Import Actions for dispatch
import { ogAction } from './actions' ;

//Import selectors for use in getting minimal state from Redux global store
import { getUser, getStudents, getStudentsOnClock, getStudentHoursInToday, getStudentHoursOutToday,  } from '../../containers/App/selectors.js';

//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';

class HoursToday extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      //this.state = {x: '' };
  }
  componentWillMount(){
    console.log('Student is', this.props.student);
    this.props.onChangeUser( 'RETRIVE-HOURS-TODAY', this.props.student, this.props.user.Department );
  }

    
  render() {
    return (
      <div>
      {this.props.studentHoursInToday != null ? this.props.studentHoursInToday.map( (current, index) => 
         <div key = {index}>
          <h4>In:  {current.TimeStamp} &nbsp; &nbsp; Out: {this.props.studentHoursOutToday[index] != null ?  this.props.studentHoursOutToday[index].TimeStamp : 'Currently Clocked In'}</h4>
          
        </div>
        ) : <h4>No hours today from this student</h4>}
          
      </div>
    );
  }
}

//Redux method to allow the props to have access to the Redux global store
//With the least minimal state representation possible through Reselect library
const mapStateToProps = createStructuredSelector({
	  user: getUser(),
    students: getStudents(),
    studentsOnClock: getStudentsOnClock(),
    studentHoursInToday: getStudentHoursInToday(),
    studentHoursOutToday: getStudentHoursOutToday(),
  });
  
 //Redux method to bind the actions created in the component to a dispatch
 export function mapDispatchToProps(dispatch) {
  return {
    onChangeUser: (evt,name,department) => dispatch(ogAction(evt,name,department))
  };
}
 //Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps,mapDispatchToProps)(HoursToday);