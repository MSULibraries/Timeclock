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
          <div style = {{ width: '100%'}}>
            {this.props.ws!="1" ? <canvas ref="graph2" width="100" height="100"></canvas> : '' }
          </div>  
    );
  }
}
