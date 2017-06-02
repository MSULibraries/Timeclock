/*
 *
 * This component shows the current activity of the day for the students 
 * of the supervisor. Work in progress 6/2/17
 * 
 * */

import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Table from 'rc-table';
//Import selectors for use in getting minimal state from Redux global store
import {  getStudentsOnClock } from '../../containers/App/selectors.js';

//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';
const columns = [
                  {title: 'Name', dataIndex: 'name', key:'name', width: 200,}, 
                  {title: 'Clock-In', dataIndex: 'ClockIn', key:'ClockIn', width: 100,},
                  {title: 'Clock-Out', dataIndex: 'ClockOut', key:'ClockOut', width: 100} 
                ];

const data = [
               { name: 'Justin Samuels', ClockIn: '11:06 AM', ClockOut: '1:00 PM', key:'1' },
               { name: 'Matthew Motes', ClockIn: '11:06 AM', ClockOut: '1:00 PM', key:'2' },
             ];

class CurrentStudents extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      //this.state = {x: '' };
  }
    
  render() {
    return (
      <div style={{textAlign:'left'}}>
        <h2>Today's Activity</h2>   
        <Table columns={columns} data={data} />
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