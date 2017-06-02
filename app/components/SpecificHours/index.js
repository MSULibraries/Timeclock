/*
 *
 * This component renders data for the supervisor inquiring
 * about a SPECIFIC day the student worked on
 * 
 * */

import React from 'react';
import { Link, browserHistory } from 'react-router';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
//Import Actions for dispatch
import { RetriveDate } from './actions' ;

//Import selectors for use in getting minimal state from Redux global store
import { getSpecificHours } from '../../containers/App/selectors.js';

//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';


class Supervisor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      this.getDate = this.getDate.bind(this);
  }

  getDate(e){
   let month = e.target.value.substring(5,7);
   let day = e.target.value.substring(8,10);
   let year = e.target.value.substring(0,4);
   let fullDate = month + "/" + day + "/" + year;
   this.props.onChangeUser('RETRIVE-SPECIFIC-HOURS', this.props.student, this.props.dept, fullDate.replace(/^0+/, ''));  
  }

  render() {
    return (
        <h4> Select Specific Day: &nbsp;
         <input style={ {background: 'white', border:'1px solid #ccc', borderRadius:'3px'}} type="date" onChange = {this.getDate} />
         <div>
         {this.props.specificHours.map( (current,index) =>
           <h4 key = {index}>{current.TimeStamp}</h4>
             )}
         </div>
        </h4> 
    );}
}

//Redux method to allow the props to have access to the Redux global store
//With the least minimal state representation possible through Reselect library
const mapStateToProps = createStructuredSelector({
    specificHours: getSpecificHours()
  });
  
 //Redux method to bind the actions created in the component to a dispatch
 export function mapDispatchToProps(dispatch) {
  return {
    onChangeUser: (evt,name,department,time) => dispatch(RetriveDate(evt,name,department,time))
  };
}
 //Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps,mapDispatchToProps)(Supervisor);