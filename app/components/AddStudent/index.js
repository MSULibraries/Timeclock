import React from 'react';

export default class AddStudent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      //this.state = {x: '' }; 
         this.state = {div: false }; 
     }
     menu(){
       var menu = {
       'Add Student': () => this.setState({div:true}),
       'Remove Student': () => this.student(),
       'Clock Student In': () => this.clock(),
       'Clock Student Out': () => this.clock(),
       'Print Timesheet': () =>  this.print()
       }
       return ( menu[this.props.option] || menu['default'] ) () ;
     }
     student(){
     }
     clock(){
     console.log('clock method');
     }
     print(){
     console.log('print method');
     }
     componentWillReceiveProps(){
       this.menu()
     }
 
  render() {
   //Trying to figure out how to dynamic render
    return (
      <div ref = 'div'>
       {this.state.div}
      </div>
    );
   
  }
}

AddStudent.defaultProps = {
         option: 'default'
       };