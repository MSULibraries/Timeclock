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
#container {
  margin-left:0 !important;
  margin-right:0 !important;
  max-width: 70% !important;
 
}
#left-column{
    width:30% !important;
}
#middle-column{
    width:40% !important;
}

.fixedDataTableColumnResizerLineLayout_mouseArea{
    height:0px !important;
}




  
@media only screen and (max-width: 1900px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:90%;

    }
} 

@media only screen and (max-width: 1800px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:83%;

    }
} 
@media only screen and (max-width: 1710px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:81%;

    }
} 

@media only screen and (max-width: 1700px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:83%;

    }
} 

@media only screen and (max-width: 1600px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:80%;

    }
}  
@media only screen and (max-width: 1532px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:68%;
 
    }
}  
@media only screen and (max-width: 1460px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:70%;
 
    }
}  
@media only screen and (max-width: 1400px) {
    #BudgetInfo, #ViewHoursStyle, #CurrentStudentsStyle, #UpdateInfoStyle, #PrintTimeStyle, #RemoveStudentStyle, #StuNamesStyle {
        font-size:67%;
 
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
        font-size:48%;
        overflow: hidden;
    }
} 



`;
