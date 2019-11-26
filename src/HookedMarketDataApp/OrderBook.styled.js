import styled from "styled-components";

const pickColor = (delta) => (delta > 0) ? "green" : "#aa0000";
const pickBgColor = (delta) => (delta > 0) ? "rgba(22, 255, 22, 0.15)" : "rgba(255, 22, 22, 0.15)";

export const OrderTable = styled.div`
  border: 1px solid black;
  margin: 10px;
`;

export const DeltaSpan = styled.span`
  font-size: 10px;
`;

export const DataRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 8px 4px;
  border: 1px solid black;
  color: ${props => props.delta ? pickColor(props.delta) : "black"};
  background-color: ${props => props.delta ? pickBgColor(props.delta) : "white"};
  transition: ${props => props.delta ? "all 150ms ease-out" : "all 2000ms ease-out"};
`;

export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 8px, 4px;
  border: 1px solid black;
  font-weight: bold;
`;