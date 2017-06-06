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
import { FormAction } from './actions';
//Import selectors for use in getting minimal state from Redux global store
import { getStudentStatus, getDepartments } from '../../containers/App/selectors.js';
//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';

class AddStudent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    //this.x = this.x.bind(this);
    this.check = this.check.bind(this);
    this.update = this.update.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkWorkStudy = this.checkWorkStudy.bind(this);
    //this.state = {x: '' }; 
    this.state = { NetID: '', NINEdigit: '', firstName: '', lastName: '', employeeType: '', WS: 0, sex: '', race: '', dept1: '', dept2: '', dept3: '', dept4: '', status: false, Phone: '', Addr: '' };
  }

  update(e) {
    this.setState({ NetID: e.target.value });
  }
  check() {
    this.props.FormAction('CHECK-STUDENT-STATUS', this.state);
  }

  checkWorkStudy(e) {
    const workStudy = document.getElementById("WS");

    if (workStudy.checked) {
      this.setState({
        WS: 1
      });
    }
    else {
      this.setState({
        WS: 0
      });
    }
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
    alert('Your Student was successfully submitted ');
    event.preventDefault();
    this.props.FormAction('SUBMIT-STUDENT', this.state);
  }

  render() {
    return (
      <div>
        <h2>Add/Edit Student</h2>
        <form onSubmit={this.handleSubmit}>
          <H3>Net ID: <input type="text" name="NetID" style={{ background: 'white', border: '1px solid #ccc', borderRadius: '3px' }} onChange={this.handleChange} /> </H3><br />
          <H3>MSU 9-Digit: <input type="text" name="NINEdigit" style={{ background: 'white', border: '1px solid #ccc', borderRadius: '3px' }} onChange={this.handleChange} onFocus={this.check} /> </H3><br />
          <H3>First Name: <input type="text" name="firstName" style={{ background: 'white', border: '1px solid #ccc', borderRadius: '3px' }} onChange={this.handleChange} /> </H3><br />
          <H3>Last Name: <input type="text" name="lastName" style={{ background: 'white', border: '1px solid #ccc', borderRadius: '3px' }} onChange={this.handleChange} /> </H3><br />
          <H3>Phone: <input type="text" name="Phone" style={{ background: 'white', border: '1px solid #ccc', borderRadius: '3px' }} onChange={this.handleChange} /> </H3><br />
          <H3>Address: <input type="text" name="Addr" style={{ background: 'white', border: '1px solid #ccc', borderRadius: '3px' }} onChange={this.handleChange} /> </H3><br />

          <H3>Employee Type: <select style={{ width: '8em' }} onChange={this.handleChange} id="SelectOption" name="employeeType" >
            <option value="UG" >Undergrad &nbsp;</option>
            <option value="GR" >Grad</option>
          </select></H3> <br />
          <H3>Sex: <select onChange={this.handleChange} id="SelectOption" name="sex">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          </H3><br />
          <H3>Race: <select id="SelectOption" name="race" onChange={this.handleChange}>
            <option value="AA">Select Race</option>
            <option value="AA">African American</option>
            <option value="Cauc">Caucsian</option>
            <option value="Asn">Asian</option>
            <option value="Hisp">Hispanic</option>
            <option value="Oth">Other</option>
          </select>
          </H3><br />
          <H3>
            Work Study
           <input id="WS" type="checkbox" onChange={this.checkWorkStudy} />
          </H3>

          <H3>Dept1: <select id="SelectOption" name="dept1" onChange={this.handleChange}>
            <option value="**">Select Department</option>
            {this.props.Department.map((current, index) =>
              <option key={current.Department}>{current.Department}</option>
            )}
          </select>
          </H3><br />
          <H3>Dept2: <select id="SelectOption" name="dept2" onChange={this.handleChange}>
            <option value="**">Select Department</option>
            {this.props.Department.map((current, index) =>
              <option key={current.Department}>{current.Department}</option>
            )}
          </select>
          </H3><br />
          <H3>Dept3: <select id="SelectOption" name="dept3" onChange={this.handleChange}>
            <option value="**">Select Department</option>
            {this.props.Department.map((current, index) =>
              <option key={current.Department}>{current.Department}</option>
            )}
          </select>
          </H3><br />
          <H3>Dept4: <select id="SelectOption" name="dept4" onChange={this.handleChange}>
            <option value="**">Select Department</option>
            {this.props.Department.map((current, index) =>
              <option key={current.Department}>{current.Department}</option>
            )}
          </select>
          </H3><br />

          <DateButton>
            {this.props.StudentStatus ? <button style={{ fontWeight: '600' }} name="status" value={false} onClick={this.handleChange} >Update Student</button> : <button style={{ fontWeight: '600' }} value={true} name="status" onClick={this.handleChange}>Submit New Student</button>}
          </DateButton>
        </form>
      </div>
    );
  }
}

//Redux method to allow the props to have access to the Redux global store
//With the least minimal state representation possible through Reselect library
const mapStateToProps = createStructuredSelector({
  StudentStatus: getStudentStatus(),
  Department: getDepartments()
});

//Redux method to bind the actions created in the component to a dispatch
export function mapDispatchToProps(dispatch) {
  return {
    FormAction: (evt, state) => dispatch(FormAction(evt, state))
  };
}
//Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);

