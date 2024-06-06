import styled from "styled-components";
import { Theme } from "../../styles/Theme";

export const StyledSVG = styled.div`
  margin: 20px 0 10px 0;

  img {
    padding: 0 10px 0 10px;
  }
`;

export const StyledLoader = styled.div`
  color: #000000;
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    box-sizing: border-box;
    position: absolute;
    border: 4px solid currentColor;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 8px;
      height: 8px;
      opacity: 0;
    }
    4.9% {
      top: 36px;
      left: 36px;
      width: 8px;
      height: 8px;
      opacity: 0;
    }
    5% {
      top: 36px;
      left: 36px;
      width: 8px;
      height: 8px;
      opacity: 1;
    }
    100% {
      top: 0;
      left: 0;
      width: 80px;
      height: 80px;
      opacity: 0;
    }
  }
`;

export const StyledContener = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 2rem;
  justify-items: center;
  max-width: 1150px;
  padding: 0 30px;
  margin-left: 100px;

  p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: white;
    background-color: ${Theme.interface};
    padding: 0.5rem;
    border-radius: 1rem;
  }

  span {
    font-weight: 700;
  }
`;

export const StyledGamepadSVGAxesAVGWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
`;

export const AxesAndButtonsWrapper = styled.div`
  /* margin-top: 2rem; */
`;

export const AxesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.3rem;
`;

export const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

export const StyledButtons = styled.div`
  background-color: ${(props) =>
    props ? `rgba(0,0,0,${props.value})` : `white`};
  color: ${(props) => (props.value > 0.4 ? `white` : `rgba(0,0,0)`)};
  padding: 10px;
  /* margin: 5px; */
  border-radius: 10px;
  width: 55px;
`;

export const HistoryList = styled.ul`
  display: flex;
  overflow-x: scroll;
  list-style-type: none;
  padding: 0;
  height: 2.5rem;
  width: 400px;
  max-width: 400px;
`;

export const HistoryWrapper = styled.div`
  /* margin-top: 2rem; */
  h3 {
    color: red;
  }

  button {
    padding: 1rem;
  }

  /* Custom Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const HistoryItem = styled.li`
  min-width: 2rem;
`;
