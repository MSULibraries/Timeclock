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
const DeptList = styled.div`
    height: 6em;
    overflow-y: scroll;
    
`;

export default H3;
export { DateButton };
export { DeptList };