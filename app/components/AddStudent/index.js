import React from 'react';
import H3 from './styles';

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
        
       <H3>Net ID: <input type = "text" name="netid" style={ {background: 'white', border:'1px solid #ccc', borderRadius:'3px'}} /> </H3><br /> 
       <H3>First Name: <input type = "text" name="firstname" style={ {background: 'white', border:'1px solid #ccc', borderRadius:'3px'}} /> </H3><br />
       <H3>Last Name: <input type = "text" name="lastname" style={ {background: 'white', border:'1px solid #ccc', borderRadius:'3px'}} /> </H3><br />
       {/*<H3>Employee Type: <input type = "radio" name = "StudentType" value = "UG" /></H3>Undergrad &nbsp; 
                             <input type="radio" name="StudentType" value="GR" />Grad<br />*/}
       <H3>Type: <select id="SelectOption">
                             <option value="UG" >Undergrad &nbsp;</option>
                             <option value="GR" >Grad</option>
                          </select></H3> <br />  
       <H3>Sex: <select id="SelectOption">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
      </H3><br />
      <H3>Race: <select id="SelectOption">
                    <option value="AA">African American</option>
                    <option value="Cauc">Caucsian</option>
                    <option value="Asn">Asian</option>
                    <option value="Hisp">Hispanic</option>
                    <option value="Oth">Other</option>
                  </select>
      </H3>
      
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

