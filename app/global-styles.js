import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    overflow-y: hidden;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }


#SelectOption
  { 
    color:gray;
    width:75%;
    background: white;
    border: 1px solid #ccc; 
    border-radius: 3px; 
  }






  
@media only screen and (max-width: 1900px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:90%;

    }
} 

@media only screen and (max-width: 1800px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:82%;

    }
} 
@media only screen and (max-width: 1710px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:81%;

    }
} 

@media only screen and (max-width: 1700px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:80%;

    }
} 

@media only screen and (max-width: 1600px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:68%;

    }
}  
@media only screen and (max-width: 1460px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:65%;
 
    }
}  
@media only screen and (max-width: 1315px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:62%;

    }
} 
@media only screen and (max-width: 1228px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:55%;

    }
} 
@media only screen and (max-width: 1140px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:55%;

    }
} 
@media only screen and (max-width: 1075px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:50%;
        overflow: hidden;
    }
} 
  @media only screen and (max-width: 1700px) {
    #InfoGroup {
        width: 44%;
        margin-left:-50px;
    }
}
  @media only screen and (max-width: 1700px) {
    #CurrentStudentsStyle {
      margin-right:4%;
    }
}

@media only screen and (max-width: 1600px) {
    #BudgetInfo { 
        width: 35%;
    }
}  
  @media only screen and (max-width: 1600px) {
    #InfoGroup {
        width: 44%;
    }
}
  @media only screen and (max-width: 1600px) {
    #UpdateInfoStyle {
        margin-right:40px;
    }
}
  @media only screen and (max-width: 1600px) {
    #StuNamesStyle {
      margin-right:40px;
    }
}
  @media only screen and (max-width: 1600px) {
    #wrapper {
      margin-left:2.625em;
    }
}

`;
