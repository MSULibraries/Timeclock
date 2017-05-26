import React from 'react';
import RemoveStudentStyle from './styles';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
//Import Actions for dispatch
import { DeleteAction } from './actions' ;
//Import selectors for use in getting minimal state from Redux global store
import { getStudentStatus } from '../../containers/App/selectors.js';
//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';

class RemoveStudent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      this.remove = this.remove.bind(this);
      //this.state = {x: '' };
  }
  
  remove(){
     this.props.DeleteAction('DELETE-STUDENT',this.props.student);
  }
    
  render() {
    return (
      <RemoveStudentStyle id="RemoveStudentStyle">  
       <h3 onClick = {this.remove}>Deactivate Student</h3>
      </RemoveStudentStyle>

    );
  }
}

//Redux method to allow the props to have access to the Redux global store
//With the least minimal state representation possible through Reselect library
const mapStateToProps = createStructuredSelector({
    StudentStatus: getStudentStatus()
  });
  
 //Redux method to bind the actions created in the component to a dispatch
 export function mapDispatchToProps(dispatch) {
  return {
    DeleteAction: (evt,NetID) => dispatch(DeleteAction(evt,NetID))
  };
}
 //Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps,mapDispatchToProps)(RemoveStudent);