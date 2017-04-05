import React from 'react';

export default class Student extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      this.showOptions = this.showOptions.bind(this);
      //this.state = {x: '' };
      this.state = {options: '', flag: false, optionsFlag: false, innerOptions: '' };
  }
  
  showOptions(){
    var option =  <div>  
                    <h1 onClick = { () => this.showTime() }>View Time</h1>
                    <h1 onClick = { () => this.updateInfo() }>Update Information</h1>
                    <h1>Remove from timeclock</h1>
                  </div>;
    this.setState({options: option});
    this.setState({flag: !this.state.flag});
  }
    
  render() {
    return (
      <div>
        {this.props.name}
        {this.state.flag == true ? this.state.options : ''}
        {this.state.optionsFlag == true ? <div>{this.state.innerOptions}</div> : ''}
      </div>
    );
  }
}