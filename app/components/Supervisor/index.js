/*
 *
 * This component is rendered when a supervisor logs in. 
 * It is used to render their dashboard with the appropiate attributes
 * 
 * */
import React from 'react';
import { Link, browserHistory } from 'react-router';
import WrapMe, { StuNames, ViewHoursStyle, UpdateInfoStyle, CurrentStudentsStyle, TodaysActivityStyle } from './styles';
import ViewHours from '../ViewHours';
import AddStudent from '../AddStudent';
import RemoveStudent from '../RemoveStudent';
import PrintTime from '../PrintTime';
import CurrentStudents from '../CurrentStudents';
import TodaysActivity from '../TodaysActivity';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Grid from 'react-grid-system';
//Import Actions for dispatch
import { ogAction } from './actions';

//Import selectors for use in getting minimal state from Redux global store
import { getUser, getStudents, getStudentsOnClock } from '../../containers/App/selectors.js';

//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';


class Supervisor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.state = { student: '', hoursUsed: 0, hoursRemain: 0, flag: false, NetID: '', WorkStudy: 0 };
  }

  componentWillMount() {
    this.props.onChangeUser('RETRIVE-STUDENTS', this.props.user.NetID, this.props.user.Department1);
  }

  open(id, used, remain, NetID, ws) {
    this.setState({ student: id });
    this.setState({ hoursUsed: used });
    this.setState({ hoursRemain: remain });
    this.setState({ NetID: NetID });
    this.setState({ WorkStudy: ws });
  }

  render() {
    return (
      <WrapMe id="wrapper">

        <Grid.Container id="container">
          <Grid.Row>
            <Grid.Col md={12}>
              <Grid.Row>
                {/*Update Student Information*/}
                <Grid.Col md={4} id="left-column">
                  <UpdateInfoStyle id="UpdateInfoStyle">
                    <AddStudent student={this.state.student} />
                  </UpdateInfoStyle >
                </Grid.Col>
                <Grid.Col md={4} id="middle-column">

                  {/*Students Activity for the day*/}
                  <TodaysActivityStyle id="CurrentStudentsStyle">
                    <TodaysActivity />
                  </TodaysActivityStyle>

                  {/*<CurrentStudentsStyle id="CurrentStudentsStyle">      
            <CurrentStudents />
           </CurrentStudentsStyle>  */}

                  {/*Students that Belong to Each Department*/}
                  <StuNames id="StuNamesStyle">
                    <h2>Active Students:</h2>
                    {this.props.student.map((current, index) =>
                      <div key={index} >
                        <h3> <input type="radio" name="student" onClick={() => this.open(current.ID, current.HoursWorked, current.HoursRemain, current.NetID, current.WS)} /> {current.FirstName} {current.LastName} </h3>
                      </div>
                    )}
                  </StuNames>

                  {/*Remove Student Button*/}
                  <RemoveStudent student={this.state.NetID} />

                  {/*Print Student Time Button*/}
                  <PrintTime />

                </Grid.Col>

                {/*Hours and Information for Each Student*/}
                <Grid.Col md={3} id="right-column">
                  <ViewHoursStyle id="ViewHoursStyle">
                    <h2>Student Information</h2>
                    <ViewHours ws={this.state.WorkStudy} dept={this.props.user.Department1} student={this.state.NetID} hoursUsed={this.state.hoursUsed} hoursRemain={this.state.hoursRemain} />
                  </ViewHoursStyle>
                </Grid.Col>
              </Grid.Row>
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
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
    onChangeUser: (evt, name, department) => dispatch(ogAction(evt, name, department))
  };
}
//Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps, mapDispatchToProps)(Supervisor);