import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
//Import Actions for dispatch
import { ReviewTime, StudentTimeComputed  } from './actions' ;

//Import selectors for use in getting minimal state from Redux global store
import { getStudentReviewHours  } from '../../containers/App/selectors.js';

//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';

class ReviewTimeClass extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      this.selectTime = this.selectTime.bind(this);
      //this.state = {x: '' };
      this.state = { timeWorked: [ {} ], flag: false }
  }
  
 selectTime(e){
   this.props.reviewTimeAction("RETRIVE-STUDENT-TIME-TO-REVIEW", this.props.student, e.target.value);
   this.setState({flag: true});
 }

  render() {
    return (
      <div>
      <select onChange = {this.selectTime}>
      <option  value = "">
          SELECT A DATE
        </option>
        <option  value = "'5/16/2017' AND '5/17/2017'">
          5/3/2017 - 5/15/2017
        </option>
        <option  value = "'6/3/2017' AND '6/15/2017'">
          6/3/2017 - 6/15/2017
        </option>
      </select>
         <ul>
         {this.props.ReviewHours != null ? this.props.ReviewHours.map( (current, index) =>   
           <li key = {index}> {current.Date} : {current.HoursWorked} </li>
           ) : <h4>Monies Not computed for this pay periord yet</h4>}
            
         </ul>
      </div>
    );
  }
}

//Redux method to allow the props to have access to the Redux global store
//With the least minimal state representation possible through Reselect library
const mapStateToProps = createStructuredSelector({
    ReviewHours: getStudentReviewHours()
  });
  
 //Redux method to bind the actions created in the component to a dispatch
 export function mapDispatchToProps(dispatch) {
  return {
    reviewTimeAction: (evt,name,time) => dispatch(ReviewTime(evt,name,time))
  };
}
 //Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps,mapDispatchToProps)(ReviewTimeClass);