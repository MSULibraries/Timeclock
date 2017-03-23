import React from 'react';

export default class AddStudent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      //this.state = {x: '' }; 
         this.state = {option: 'add' }; 
     }
 
  render() {
   if(this.props.option == "Add"){
    return (
      <div>
       <label>Net ID: <input type = "text" /> </label><br /> 
       <label>First Name: <input type = "text" /> </label><br />
       <label>Last Name: <input type = "text" /> </label><br />
       <label>Employee Type: <input type = "radio" name = "StudentType" value = "UG" /></label>Undergrad &nbsp; 
                             <input type = "radio" name = "StudentType" value = "GR" />Grad<br />
       <label>Sex: <select>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
      </label><br />
      <label>Race: <select>
                    <option value="AA">African American</option>
                    <option value="Cauc">Caucsian</option>
                    <option value="Asn">Asian</option>
                    <option value="Hisp">Hispanic</option>
                    <option value="Oth">Other</option>
                  </select>
      </label>
      
     </div>
    );
   }
   else{
     return(
       <div><label>Enter Net ID: <input type = "text" /> </label><br /></div>
     )
   }
   
  }
}

