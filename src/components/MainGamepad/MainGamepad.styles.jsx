import styled from "styled-components";
import { Theme } from "../../styles/Theme";

export const StyledLoader = styled.div`
  margin: 2rem 0 1rem 0;
  color: ${Theme.black};
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

export const StyledSVG = styled.div`
  margin: 20px 0 10px 0;
  scale: 1.2;

  img {
    padding: 0 10px 0 10px;
  }
`;

export const StyledContener = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 2rem;
  justify-items: center;
  max-width: 1150px;
  padding: 30px 30px;
  border: 3px solid ${Theme.secondary};
  border-radius: 1rem;

  &.scale08 {
    transform: scale(0.8);
    margin-top: -2.7rem;
  }

  &.scale09 {
    transform: scale(0.9);
    margin-top: -0.4rem;
  }

  &.scale1 {
    transform: scale(1);
  }

  &.scale11 {
    transform: scale(1.1);
    margin-top: 4.1rem;
  }

  &.scale12 {
    transform: scale(1.2);
    margin-top: 6.5rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: ${Theme.white};
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
  background-color: ${Theme.white};
  border-radius: 1rem;
  padding: 2rem;
`;

export const AxesAndButtonsWrapper = styled.div`
  /* margin-top: 2rem; */
`;

export const AxesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.3rem;
  margin: 0 auto;
  justify-items: center;
  background-color: ${Theme.white};
  border-radius: 1rem;
  padding: 2rem;
`;

export const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  background-color: ${Theme.white};
  border-radius: 1rem;
  padding: 2rem;
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
  height: 3rem;
  max-width: 550px;
  margin: 1rem auto;
  background-color: ${Theme.white};
  border-radius: 1rem;
`;

export const HistoryWrapper = styled.div`
  h3 {
    color: ${Theme.white};
    background-color: ${Theme.interface};
    border-radius: 1rem;
    padding: 1rem;
    margin-top: 1rem;
  }

  button {
    background-color: ${Theme.secondary};
    border-radius: 1rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border-style: none;
    font-size: 2rem;
    color: ${Theme.white};
    border: 2px solid ${Theme.white};

    &:hover {
      -webkit-box-shadow: 0px 0px 7px 0px rgba(66, 68, 90, 1);
      -moz-box-shadow: 0px 0px 7px 0px rgba(66, 68, 90, 1);
      box-shadow: 0px 0px 7px 0px rgba(66, 68, 90, 1);
      background-color: ${Theme.white};
      color: ${Theme.secondary};
      border: 2px solid ${Theme.secondary};
    }

    &:first-child {
      background-color: ${Theme.white};
      padding: 0 1.6rem;
      margin-left: 2rem;
      border: 2px solid ${Theme.secondary};
      color: ${Theme.secondary};

      &:hover {
        background-color: ${Theme.secondary};
        color: ${Theme.white};
      }
    }
  }

  /* Custom Scrollbar Styles */
  ::-webkit-scrollbar {
    margin-top: 1rem;
    scrollbar-width: thin;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Theme.interface};
    border-radius: 1rem;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const HistoryItem = styled.li`
  min-width: 2rem;
  font-size: 0.85rem;
  margin: 0.2rem 0.6rem;
  background-color: ${Theme.secondary};
  color: ${Theme.white};
  padding: 0.3rem;
  border-radius: 1rem;
`;

export const StyledHistoryAndVibrationButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledVibrationLoopButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Theme.white};
  border-radius: 1rem;
  padding: 0.5rem;
`;

export const StyledSmallInfo = styled.div`
  font-size: 0.6rem;
  margin-top: 0.3rem;
`;
