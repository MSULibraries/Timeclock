import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import chart from 'chart.js';
import HoursToday from '../HoursToday';
import SpecificHours from '../SpecificHours';
import ReviewTime from '../ReviewTime';
import DateButton from './styles';



export default class StudentGraph extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      this.plot = this.plot.bind(this);
  }
  plot(){
   var ctx = this.refs.graph2;
var data = {
    labels: [
        "Budget Used",
        "Budget Remaining"
    ],
    datasets: [
        {
            data: [this.props.budgetUsed,this.props.budgetRemain ],
            backgroundColor: [
                "#FF6384",
                "#90ee90"
            ],
            hoverBackgroundColor: [
                "#36A2EB",
                "#36A2EB"
            ]
        }]
}; 
var myChart = new Chart(ctx, {
    type: 'pie',
    data: data
});
 }
 
 componentDidUpdate(){
     this.plot();
 }
 
    
  render() {

      return (
        
        <div>
        <h3>Budget Started: 10,250.00</h3>
        <h3>Budget Used: {this.props.budgetUsed}</h3>
        <h3>Budget Remaining: {this.props.budgetRemain}</h3>
        <DateButton id="DateButton">
        <h3 onClick = { () => this.setState({ flag1: !this.state.flag1 }) }>View Hours Worked Today</h3></DateButton>
        {(this.state.flag1 && this.props.student != '') ? <HoursToday student = {this.props.student} /> : ''}
        <DateButton id="DateButton">
        <h3 onClick = { () => this.setState({ flag2: !this.state.flag2 }) }>View A Specific Day</h3></DateButton>
        {(this.state.flag2 && this.props.student != '') ? <SpecificHours student = {this.props.student} /> : ''}
        <DateButton id="DateButton">
        <h3 onClick = { () => this.setState({ flag3: !this.state.flag3 }) }>Review Hours For Pay Period</h3></DateButton>
        {(this.state.flag3 && this.props.student != '') ? <ReviewTime student = {this.props.student} /> : ''}
        
          <div>
            <canvas ref="graph2" width="100" height="100"></canvas>
          </div>
              </div>
             

    return (
          <div style = {{ width: '20%'}}>
            <canvas ref="graph2" width="100" height="100"></canvas>
          </div>

    );
  }
}
