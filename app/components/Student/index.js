import React from 'react';

export default class Student extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      this.showOptions = this.showOptions.bind(this);
      //this.state = {x: '' };
      this.state = {options: '', flag: false };
  }
  
  showOptions(){
    var option =  <div onClick = { () => console.log('hello world') }>
                    <h1>Hello World</h1>
                    <h2>Testing</h2>
                  </div>;
    this.setState({options: option});
    this.setState({flag: !this.state.flag});
  }
    
  render() {
    return (
      <div onClick = { this.showOptions }>
        {this.props.name}
        {this.state.flag == true ? this.state.options : ''}
      </div>
    );
  }
}