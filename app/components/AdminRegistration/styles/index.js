import styled from 'styled-components';

const H3 = styled.h3`
  font-size: 1.17em;
  font-weight: bold;
  margin: 0;
  `;

const DateButton = styled.div`
    width:20em;
    margin-top:0.625em;
    display: block;
    text-align:center;
    background: maroon;
    border-color: #ccc;
    color: white;
    border-style: solid;
    vertical-align: top;
    border-width: 0.0625em 0.0625em 0.125em;
    cursor: pointer;
    border-radius: 0.25em;
`;
const RegisterStyle = styled.div`
  margin-bottom:1.25em;
  padding-left:1.25em;
  padding-top:0.3125em;
  padding-bottom:0.9375em;
  width: 23.125em;
  height: auto;
  background-color: #f1f1f1;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;
`;


export default H3;
export { DateButton };
export { RegisterStyle };