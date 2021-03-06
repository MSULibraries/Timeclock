/*
 *
 * This component holds the student Information components (View Hours Today, View A specific Day, Review Hours)
 * 
 * */

import React from 'react';
import StudentGraph from '../StudentGraph';
import HoursToday from '../HoursToday';
import SpecificHours from '../SpecificHours';
import ReviewTime from '../ReviewTime';
import DateButton from './styles';

export default class ViewHours extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      this.state = {flag1: false, flag2: false, flag3: false }; //These flags are used to control the opening and closing of the student information section 
  }

    
  render() {
    return (
      <div>
        <DateButton id="DateButton"> 
          <button style={ {fontWeight: 'bold'}} onClick = { () => this.setState({ flag1: !this.state.flag1, flag2: false, flag3: false }) }>View Hours Worked Today</button>
        </DateButton>
        
        {(this.state.flag1 && this.props.student != '') ? <HoursToday dept = {this.props.dept} student = {this.props.student} /> : ''}
        
        <DateButton id="DateButton">
          <button style={ {fontWeight: 'bold'}} onClick = { () => this.setState({ flag2: !this.state.flag2, flag1: false, flag3: false }) }>View A Specific Day</button>
        </DateButton>
        
        {(this.state.flag2 && this.props.student != '') ? <SpecificHours dept = {this.props.dept} student = {this.props.student} /> : ''}
       
        <DateButton id="DateButton">
          <button style={ {fontWeight: 'bold'}} onClick = { () => this.setState({ flag3: !this.state.flag3, flag1: false, flag2: false }) }>Review Hours For Pay Period</button>
        </DateButton>
        
        {(this.state.flag3 && this.props.student != '') ? <ReviewTime dept = {this.props.dept} student = {this.props.student} /> : ''}
        
        {/*Displays below if the student is WorkStudy*/}
        {this.props.ws != "1" ? <div>
        <h3>Work-Study Started: $1,176</h3>
        <h3>Work-Study Used: ${this.props.hoursUsed}</h3>
        <h3>Work-Study Remaining: ${this.props.hoursRemain}</h3>  </div>: '' }
        <StudentGraph ws = {this.props.ws} student = {this.props.student} budgetUsed = {this.props.hoursUsed} budgetRemain = {this.props.hoursRemain} />
      </div>
    );
  }
}