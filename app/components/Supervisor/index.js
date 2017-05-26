import React from 'react';
import { Link, browserHistory } from 'react-router';
import WrapMe from './styles';
import ViewHours from '../ViewHours';
import UpdateInfo from '../UpdateInfo';
import RemoveStudent from '../RemoveStudent';
import PrintTime from '../PrintTime';
import CurrentStudents from '../CurrentStudents';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
//Import Actions for dispatch
import { ogAction } from './actions' ;

//Import selectors for use in getting minimal state from Redux global store
import { getUser, getStudents, getStudentsOnClock } from '../../containers/App/selectors.js';

//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';


class Supervisor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      this.open = this.open.bind(this);
      this.print = this.print.bind(this);
      this.state = { student: '', hoursUsed: 0, hoursRemain: 0, flag: false, NetID: '' };
  }
  
  componentWillMount(){
    this.props.onChangeUser( 'RETRIVE-STUDENTS', this.props.user.NetID, this.props.user.Department );
  }
  
  open(id, used, remain, NetID){
    this.setState({ student: id });
    this.setState({ hoursUsed: used });
    this.setState({ hoursRemain: remain });
    this.setState({ NetID: NetID});
  }
  print(){
    fetch('./test',{
      method: 'POST',
      body: JSON.stringify([{name: 'Justin'}, {name: 'Tim'}]),
      headers: new Headers({
          'Content-Type': 'application/json; charset=utf-8'
         })
    })
    .then((result) => {
          return result.json();
        })
    .then((response) => {
          console.log(response);
        })
    .catch(function(error){
          //window.location = "./logout";
         console.log(error);
        });
  }

  render() {
    return (
        <WrapMe>
         {this.props.student.map( (current, index) =>
          <div key = {index} > 
            <h1 onClick = { () => this.open(current.ID, current.HoursWorked, current.HoursRemain, current.NetID) } >Name: {current.FirstName} {current.LastName} </h1> 
          </div>
          )}
          <ViewHours student ={this.state.NetID} hoursUsed = {this.state.hoursUsed} hoursRemain = {this.state.hoursRemain} />
          <UpdateInfo student ={this.state.student} />
          <RemoveStudent student ={this.state.NetID} />
          <CurrentStudents   />
          <PrintTime />
        </WrapMe>
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
    onChangeUser: (evt,name,department) => dispatch(ogAction(evt,name,department))
  };
}
 //Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps,mapDispatchToProps)(Supervisor);