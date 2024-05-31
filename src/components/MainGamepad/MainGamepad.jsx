import { useEffect, useState } from "react";
import USB_SVG from "../../assets/usb.svg";
import BT_SVG from "../../assets/bt.svg";
import styled from "styled-components";
import { AxesSVG } from "../../components/AxesSVG/AxesSVG";
import { XboxSVG } from "../../components/XboxSVG/XboxSVG";
import { PS4SVG } from "../../components/PS4SVG/PS4SVG";

// one const to rule them all

// const playerNumber = 0;

//
//

const StyledSVG = styled.div`
  margin: 20px 0 10px 0;

  img {
    padding: 0 10px 0 10px;
  }
`;

const StyledLoader = styled.div`
  /* change color here */
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

const AxesAndButtonsWrapper = styled.div`
  margin-top: 2rem;
`;

const AxesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

// STYLE FOR BUTTONS
const StyledButtons = styled.div`
  background-color: ${(props) =>
    props ? `rgba(0,0,0,${props.value})` : `white`};
  color: ${(props) => (props.value > 0.4 ? `white` : `rgba(0,0,0)`)};
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  width: 55px;
`;

export function MainGamepad({ playerNumber }) {
  const [leftX, setLeftX] = useState(0);
  const [leftY, setLeftY] = useState(0);
  const [rightX, setRightX] = useState(0);
  const [rightY, setRightY] = useState(0);
  const [l3Pressed, setL3Pressed] = useState(false);
  const [r3Pressed, setR3Pressed] = useState(false);
  const [lt, setLT] = useState(0);
  const [rt, setRT] = useState(0);
  const [lbPressed, setLBPressed] = useState(false);
  const [rbPressed, setRBPressed] = useState(false);
  const [APressed, setAPressed] = useState(false);
  const [BPressed, setBPressed] = useState(false);
  const [XPressed, setXPressed] = useState(false);
  const [YPressed, setYPressed] = useState(false);
  const [upPressed, setUPPressed] = useState(false);
  const [downPressed, setDOWNPressed] = useState(false);
  const [leftPressed, setLEFTPressed] = useState(false);
  const [rightPressed, setRIGHTPressed] = useState(false);
  const [sharePressed, setSHAREPressed] = useState(false);
  const [optionsPressed, setOPTIONSPressed] = useState(false);
  const [logoPressed, setLogoPressed] = useState(false);
  const [touchbarPressed, setTouchbarPressed] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [gamepadName, setGamepadName] = useState("");
  const [buttons, setButtons] = useState(0);
  const [axes, setAxes] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const interval = setInterval(() => {
      const gpad = navigator.getGamepads()[playerNumber];
      if (gpad) {
        setLeftX(gpad.axes[0]);
        setLeftY(gpad.axes[1]);
        setRightX(gpad.axes[2]);
        setRightY(gpad.axes[3]);
        setL3Pressed(gpad.buttons[10].pressed);
        setR3Pressed(gpad.buttons[11].pressed);
        setLT(gpad.buttons[6].value);
        setRT(gpad.buttons[7].value);
        setLBPressed(gpad.buttons[4].pressed);
        setRBPressed(gpad.buttons[5].pressed);
        setAPressed(gpad.buttons[0].pressed);
        setBPressed(gpad.buttons[1].pressed);
        setXPressed(gpad.buttons[2].pressed);
        setYPressed(gpad.buttons[3].pressed);
        setUPPressed(gpad.buttons[12].pressed);
        setDOWNPressed(gpad.buttons[13].pressed);
        setLEFTPressed(gpad.buttons[14].pressed);
        setRIGHTPressed(gpad.buttons[15].pressed);
        setSHAREPressed(gpad.buttons[8].pressed);
        setOPTIONSPressed(gpad.buttons[9].pressed);
        setLogoPressed(gpad.buttons[16].pressed);
        setTouchbarPressed(gpad.buttons[17]?.pressed);
        setConnectionStatus(gpad.connected);
        setGamepadName(gpad.id);
        setButtons(gpad.buttons.length);
        setAxes(gpad.axes.length);
      }

      if (navigator.getGamepads()[playerNumber] === null) {
        setConnectionStatus(false);
        setAxes(0);
        setButtons(0);
      }
    }, 100);
  });

  // BUTTONS SECTION

  let buttonsNumber = [];
  for (let i = 0; i < buttons; i++) {
    let buttonsValue = navigator.getGamepads()[playerNumber].buttons[i].value;

    buttonsNumber.push(
      <StyledButtons key={i} value={buttonsValue}>
        B {i}
      </StyledButtons>
    );
  }

  // AXES SECTION

  // STYLE FOR AXES
  // const StyledAxes = styled.div`
  //   background-color: white;
  //   color: black;
  //   padding: 10px;
  //   margin: 5px;
  //   border-radius: 10px;
  //   width: 70px;
  // `;

  let axesNumber = [];
  for (let i = 0; i < axes; i++) {
    let axesValue = navigator.getGamepads()[playerNumber].axes;
    let renderedAxesValue = Math.abs(axesValue[i])
      .toFixed(3)
      .toString()
      .substring(0, 5);

    const axesLabels = ["Left X ", "Left Y ", "Right X ", "Right Y "];

    axesNumber.push(
      <div key={i}>
        {axesLabels[i] || `Axes${i} `}&rArr; {renderedAxesValue}
        {/* {Math.abs(axesValue![i]) >= 0.15 ? <div className="error">error</div> : <div className="ok">ok</div>} */}
      </div>
    );
  }

  if (buttons === 0 || connectionStatus === false) {
    return (
      <>
        <StyledLoader>
          <div></div>
          <div></div>
        </StyledLoader>
        <p>Connect the controller via USB or Bluetooth and press any key</p>
        <StyledSVG>
          <img src={USB_SVG} alt="usb logo" />
          <img src={BT_SVG} alt="bluetooth logo" />
        </StyledSVG>
      </>
    );

    // ------------------ XBOX ONE
  } else if (buttons === 17) {
    return (
      <>
        <p>Gamepad ID: {gamepadName}</p>
        <AxesAndButtonsWrapper>
          <AxesWrapper>{axesNumber}</AxesWrapper>
          <ButtonsWrapper>{buttonsNumber}</ButtonsWrapper>
        </AxesAndButtonsWrapper>
        <XboxSVG
          leftX={leftX}
          leftY={leftY}
          rightX={rightX}
          rightY={rightY}
          l3Pressed={l3Pressed}
          r3Pressed={r3Pressed}
          lt={lt}
          rt={rt}
          lbPressed={lbPressed}
          rbPressed={rbPressed}
          APressed={APressed}
          BPressed={BPressed}
          XPressed={XPressed}
          YPressed={YPressed}
          upPressed={upPressed}
          downPressed={downPressed}
          leftPressed={leftPressed}
          rightPressed={rightPressed}
          sharePressed={sharePressed}
          optionsPressed={optionsPressed}
        />
        <AxesSVG
          leftX={leftX}
          leftY={leftY}
          l3Pressed={l3Pressed}
          rightX={rightX}
          rightY={rightY}
          r3Pressed={r3Pressed}
        />
      </>
    );

    // ------------------ PS4 AND PS5
  } else {
    return (
      <>
        <p>Gamepad ID: {gamepadName}</p>
        <AxesAndButtonsWrapper>
          <AxesWrapper>{axesNumber}</AxesWrapper>
          <ButtonsWrapper>{buttonsNumber}</ButtonsWrapper>
        </AxesAndButtonsWrapper>
        {/* PS4 SVG BELOW*/}
        <PS4SVG
          leftX={leftX}
          leftY={leftY}
          rightX={rightX}
          rightY={rightY}
          l3Pressed={l3Pressed}
          r3Pressed={r3Pressed}
          lt={lt}
          rt={rt}
          lbPressed={lbPressed}
          rbPressed={rbPressed}
          APressed={APressed}
          BPressed={BPressed}
          XPressed={XPressed}
          YPressed={YPressed}
          upPressed={upPressed}
          downPressed={downPressed}
          leftPressed={leftPressed}
          rightPressed={rightPressed}
          sharePressed={sharePressed}
          optionsPressed={optionsPressed}
          logoPressed={logoPressed}
          touchbarPressed={touchbarPressed}
        />
        <AxesSVG
          leftX={leftX}
          leftY={leftY}
          l3Pressed={l3Pressed}
          rightX={rightX}
          rightY={rightY}
          r3Pressed={r3Pressed}
        />
      </>
    );
  }
}
