import styled from 'styled-components';

const WrapMe = styled.div`
  width:auto;
  height:auto;
`;

const StuNames = styled.div`
  padding-left:1.25em;
  padding-bottom:0.625em;
  width:23.125em;
  height: auto;
  overflow-y:scroll;
  background-color: #f1f1f1;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;
`;
const ViewHoursStyle = styled.div`
  width:23.125em;
   padding-top:0.3125em;
  padding-bottom:0.625em;
  text-align:center;
  background-color: #f1f1f1;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;
`;

const UpdateInfoStyle = styled.div`
  margin-bottom:1.25em;
  padding-left:1.25em;
  padding-top:0.3125em;
  padding-bottom:0.9375em;
  width: 23.125em;
  height: auto;
  background-color: #f1f1f1;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;
`;

const CurrentStudentsStyle = styled.div`
  width:23.125em;
   padding-top:0.3125em;
    padding-bottom:0.3125em;
    margin-bottom:1.25em;
  padding-left:1.25em;
  height:auto;
  background-color: #f1f1f1;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;
`;
const PrintTimeStyle = styled.div`


`;

export default WrapMe;
export { StuNames };
export { ViewHoursStyle };
export { UpdateInfoStyle };
export { RemoveStudentStyle };
export { CurrentStudentsStyle };
export { PrintTimeStyle };
export { StudentGraphDiv };