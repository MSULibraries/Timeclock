/*
 *
 * This component uses a form to add a new student to,
 * or updates a student in the database
 * based off their NetID being in the database
 * 
 * 
 * */

import React from 'react';
import H3, { DateButton } from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Import Actions for dispatch
import { FormAction, LoadDepts } from './actions';
//Import selectors for use in getting minimal state from Redux global store
import { getStudentStatus, getDepartments } from '../../containers/App/selectors.js';
//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';

class AdminRegistration extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    //this.x = this.x.bind(this);
    this.check = this.check.bind(this);
    this.update = this.update.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.state = {x: '' }; 
    this.state = { NetID: 'js1599', NINEdigit: '', firstName: '', lastName: '', dept1: '', dept2: '', dept3: '', dept4: '' };
  }
  componentWillMount() {
    //this.props.LoadDepts('ALL-DEPARTMENTS');
  }
  update(e) {
    this.setState({ NetID: e.target.value });
  }
  check() {
    this.props.FormAction('CHECK-ADMIN-STATUS', this.state);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    alert('You have successfully registered ');
    event.preventDefault();
    this.props.FormAction('SUBMIT-ADMIN', this.state);
  }

  render() {
    return (
      <div>
        <h2>Admin Registration</h2>
        <form onSubmit={this.handleSubmit}>
          <H3>Net ID: <input type="text" name="NetID" style={{ background: 'white', border: '1px solid #ccc', borderRadius: '3px' }} onChange={this.handleChange} /> </H3><br />
          <H3>MSU 9-Digit: <input type="text" name="NINEdigit" style={{ background: 'white', border: '1px solid #ccc', borderRadius: '3px' }} onChange={this.handleChange} onFocus={this.check} /> </H3><br />
          <H3>First Name: <input type="text" name="firstName" style={{ background: 'white', border: '1px solid #ccc', borderRadius: '3px' }} onChange={this.handleChange} /> </H3><br />
          <H3>Last Name: <input type="text" name="lastName" style={{ background: 'white', border: '1px solid #ccc', borderRadius: '3px' }} onChange={this.handleChange} /> </H3><br />
          <H3>Primary Department: <select id="SelectOption" name="dept1" onChange={this.handleChange}>
            <option value="**">Select Department</option>
            {this.props.Department.map((current, index) =>
              <option key={current.Department}>{current.Department}</option>
            )}
          </select>
          </H3><br />
          <H3>Secondary Department: <select id="SelectOption" name="dept2" onChange={this.handleChange}>
            <option value="**">Select Department</option>
            {this.props.Department.map((current, index) =>
              <option key={current.Department}>{current.Department}</option>
            )}
          </select>
          </H3><br />
          <H3>Tertiary Department: <select id="SelectOption" name="dept3" onChange={this.handleChange}>
            <option value="**">Select Department</option>
            {this.props.Department.map((current, index) =>
              <option key={current.Department}>{current.Department}</option>
            )}
          </select>
          </H3><br />
          <DateButton>
            {this.props.StudentStatus ? <button style={{ fontWeight: '600' }} name="status" value={false} onClick={this.handleChange} >Update Student</button> : <button style={{ fontWeight: '600' }} value={true} name="status" onClick={this.handleChange}>Submit Registration</button>}
          </DateButton>
        </form>
      </div>
    );
  }
}

//Redux method to allow the props to have access to the Redux global store
//With the least minimal state representation possible through Reselect library
const mapStateToProps = createStructuredSelector({
  Department: getDepartments()
});

//Redux method to bind the actions created in the component to a dispatch
export function mapDispatchToProps(dispatch) {
  return {
    FormAction: (evt, state) => dispatch(FormAction(evt, state)),
    LoadDepts: (evt) => dispatch(LoadDepts(evt))
  };
}
//Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps, mapDispatchToProps)(AdminRegistration);

