import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
//Import Actions for dispatch
import { FormAction } from './actions' ;
//Import selectors for use in getting minimal state from Redux global store
import { getStudentStatus } from '../../containers/App/selectors.js';
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
      //this.state = {x: '' }; 
         this.state = { NetID: '', NINEdigit: '', firstName: '', lastName: '', employeeType: '', sex: '', race: '', dept1: '', dept2: '', dept3: '', dept4: '', status: false }; 
     }
     
     update(e){
       this.setState({ NetID: e.target.value});
     }
     check(){
       this.props.FormAction('CHECK-STUDENT-STATUS',this.state);
     }
     handleChange(event){
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
     this.props.FormAction('SUBMIT-STUDENT',this.state);
  }
 
  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
       <label>Net ID: <input type = "text" name = "NetID"onChange = {this.update} /> </label><br /> 
       <label>9-Digit: <input type = "text" name = "NINEdigit" onChange = {this.handleChange} onFocus = {this.check}/> </label><br /> 
       <label>First Name: <input name = "firstName" type = "text"  onChange = {this.handleChange} /> </label><br />
       <label>Last Name: <input name = "lastName" type = "text" onChange = {this.handleChange} /> </label><br />
       <label>Employee Type: <select name = "employeeType" onChange = {this.handleChange}>
                    <option value="UG">UnderGrad</option>
                    <option value="G">Grad</option>
                  </select>
       </label><br/>
       <label>Sex: <select name = "sex" onChange = {this.handleChange}>
                    <option value="AA">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
      </label><br />
      <label>Race: <select name = "race" onChange = {this.handleChange}>
                    <option value="AA">Select Race</option>
                    <option value="AA">African American</option>
                    <option value="Cauc">Caucsian</option>
                    <option value="Asn">Asian</option>
                    <option value="Hisp">Hispanic</option>
                    <option value="Oth">Other</option>
                  </select>
      </label><br/>
      <label>Dept1: <select name = "dept1" onChange = {this.handleChange}>
                    <option value="AA">Select Department</option>
                    <option value="4C-72-B9-55-CD-C3">Systems</option>
                    <option value="Asn">Asian</option>
                    <option value="Hisp">Hispanic</option>
                    <option value="Oth">Other</option>
                  </select>
      </label><br/>
      <label>Dept2: <select name = "dept2" onChange = {this.handleChange}>
                    <option value="AA">Select Department</option>
                    <option value="Cauc">Caucsian</option>
                    <option value="Asn">Asian</option>
                    <option value="Hisp">Hispanic</option>
                    <option value="Oth">Other</option>
                  </select>
      </label><br/>
      <label>Dept3: <select name = "dept3" onChange = {this.handleChange}>
                    <option value="AA">Select Department</option>
                    <option value="Cauc">Caucsian</option>
                    <option value="Asn">Asian</option>
                    <option value="Hisp">Hispanic</option>
                    <option value="Oth">Other</option>
                  </select>
      </label><br/>
      <label>Dept4: <select name = "dept4" onChange = {this.handleChange}>
                    <option value="AA">Select Department</option>
                    <option value="AA">African American</option>
                    <option value="Cauc">Caucsian</option>
                    <option value="Asn">Asian</option>
                    <option value="Hisp">Hispanic</option>
                    <option value="Oth">Other</option>
                  </select>
      </label><br/>
       {this.props.StudentStatus ? <button name = "status" value = {false} onClick = {this.handleChange} >Update Student</button> : <button value = {true} name = "status" onClick = {this.handleChange}>Submit New Student</button>}
       </form>
     </div>
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
    FormAction: (evt,state) => dispatch(FormAction(evt,state))
  };
}
 //Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps,mapDispatchToProps)(AddStudent);

