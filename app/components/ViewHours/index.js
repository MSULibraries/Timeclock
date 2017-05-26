import React from 'react';
import StudentGraph from '../StudentGraph';
import HoursToday from '../HoursToday';
import SpecificHours from '../SpecificHours';
import ReviewTime from '../ReviewTime';
import DateButton from './styles';

export default class ViewHours extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      this.state = {flag1: false, flag2: false, flag3: false };
  }

    
  render() {
    return (
      <div>
        <h3>Budget Started: 10,250.00</h3>
        <h3>Budget Used: {this.props.budgetUsed}</h3>
        <h3>Budget Remaining: {this.props.budgetRemain}</h3>
        <DateButton id="DateButton">
        <h3 onClick = { () => this.setState({ flag1: !this.state.flag1 }) }>View Hours Worked Today</h3>
        </DateButton>
        {(this.state.flag1 && this.props.student != '') ? <HoursToday student = {this.props.student} /> : ''}
        <DateButton id="DateButton">
        <h3 onClick = { () => this.setState({ flag2: !this.state.flag2 }) }>View A Specific Day</h3>
        {(this.state.flag2 && this.props.student != '') ? <SpecificHours student = {this.props.student} /> : ''}
        </DateButton>
        <DateButton id="DateButton">
        <h3 onClick = { () => this.setState({ flag3: !this.state.flag3 }) }>Review Hours For Pay Periord</h3>
        </DateButton>
        {(this.state.flag3 && this.props.student != '') ? <ReviewTime student = {this.props.student} /> : ''}
         <StudentGraph student = {this.props.student} budgetUsed = {this.props.hoursUsed} budgetRemain = {this.props.hoursRemain} />
      </div>
    );
  }
}