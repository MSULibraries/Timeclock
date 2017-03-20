import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import chart from 'chart.js';

var ctx = document.getElementById('graph');

export default class Graph extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      this.plot = this.plot.bind(this);
  }
  plot(){
   var ctx = document.getElementById("graph");
var data = {
    labels: [
        "Budget Used",
        "Budget Remaining"
    ],
    datasets: [
        {
            data: [5596.04,4653.96 ],
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
  
  componentDidMount(){
   
   
   this.plot()
   
   
   
   
  }

    
  render() {
    return (
        <div>
        <h3>Budget Started: 10,250.00</h3>
        <h3>Budget Used: 5596.04</h3>
        <h3>Budget Remaining: 4653.96</h3>
          <div style = {{ width: '20%'}}>
            <canvas id="graph" width="100" height="100"></canvas>
          </div>
      </div>
    );
  }
}
