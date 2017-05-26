import styled from 'styled-components';

const WrapMe = styled.div`
  width:auto;
  height:auto;
`;
const InfoGroup = styled.div`
  float:left;
  margin-left:1.5em;
  max-width: 50em;
`;
const StuNames = styled.div`
  float:right;
  margin-top:6.25em;
  margin-right: 1.875em;
  padding-left:20px;
  width: 23.125em;
  height: auto;
  overflow-y:scroll;
  background-color: #f1f1f1;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;
`;
const ViewHoursStyle = styled.div`
  float:right;
  width: 25em;
  height: auto;
  padding-left:0.9375em;
  background-color: #f1f1f1;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;
`;
const UpdateInfoStyle = styled.div`
  float:right;
  padding-left:20px;
  padding-top:15px;
  padding-bottom:15px;
  margin-right: 1.875em;
  width: 23.125em;
  height: auto;
  background-color: #f1f1f1;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;
`;

const CurrentStudentsStyle = styled.div`
  float:right;
  padding-left:20px;
  margin-right:2.1875em;
  width: 18.75em;
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
export { InfoGroup };