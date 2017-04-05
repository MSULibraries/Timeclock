import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import chart from 'chart.js';

export default class StudentGraph extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      this.plot = this.plot.bind(this);
  }
  plot(){
   var ctx = document.getElementById("graph2");
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
          <div style = {{ width: '20%'}}>
            <canvas id="graph2" width="100" height="100"></canvas>
          </div>
      </div>
    );
  }
}
