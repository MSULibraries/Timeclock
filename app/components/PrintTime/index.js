import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import LoginButton from './styles';
//Import Actions for dispatch
import { PrintTime } from './actions' ;

//Import selectors for use in getting minimal state from Redux global store
import { getStudentReviewHours, getStudentTimesheet } from '../../containers/App/selectors.js';

//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';

class Print extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      //this.state = {x: '' };
  }
    
  render() {
    return (
      <LoginButton id="PrintTimeStyle">
        {/*} <h3 onClick ={ () => this.props.PrintTimeAction('PRINT-TIME',this.props.ReviewHours) }>Confirm Time</h3>*/}
      <h3 target = "_blank" href = {  "/Capture?id="+this.props.Time+".xlsx"} download>Download Time</h3>
      </LoginButton>
    );
     
  } 
}

//Redux method to allow the props to have access to the Redux global store
//With the least minimal state representation possible through Reselect library
const mapStateToProps = createStructuredSelector({
    ReviewHours: getStudentReviewHours(),
    Time: getStudentTimesheet()
    
  });
  
 //Redux method to bind the actions created in the component to a dispatch
 export function mapDispatchToProps(dispatch) {
  return {
    PrintTimeAction: (evt,data) => dispatch(PrintTime(evt,data))
  };
}
 //Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps,mapDispatchToProps)(Print);