import { useEffect, useState } from "react";
import USB_SVG from "../../assets/usb.svg";
import BT_SVG from "../../assets/bt.svg";
import styled from "styled-components";

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

const AxesAndButtonsWrapper = styled.div``;

const AxesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin: 70px 0 0 10px;
`;

export function PlayerOne() {
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
      const gpad = navigator.getGamepads()[0];
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
    }, 100);
  });

  // BUTTONS SECTION

  let buttonsNumber = [];
  for (let i = 0; i < buttons; i++) {
    // let buttonsValue = navigator.getGamepads()[0].buttons[i].value;

    // STYLE FOR BUTTONS
    // const StyledButtons = styled.div`
    //   background-color: ${buttonsValue > 0
    //     ? `rgba(0,0,0,${buttonsValue})`
    //     : `white`};
    //   color: ${buttonsValue > 0.4 ? `white` : `rgba(0,0,0)`};
    //   padding: 10px;
    //   margin: 5px;
    //   border-radius: 10px;
    //   width: 55px;
    // `;
    buttonsNumber.push(<div key={i}>B {i}</div>);
  }

  // AXES SECTION

  let axesNumber = [];
  for (let i = 0; i < axes; i++) {
    let axesValue = navigator.getGamepads()[0].axes;
    let renderedAxesValue = Math.abs(axesValue[i])
      .toFixed(3)
      .toString()
      .substring(0, 5);

    // STYLE FOR AXES
    // const StyledAxes = styled.div`
    //   background-color: white;
    //   color: black;
    //   padding: 10px;
    //   margin: 5px;
    //   border-radius: 10px;
    //   width: 70px;
    // `;

    axesNumber.push(
      <div key={i}>
        Axis {i}: {renderedAxesValue}
        {/* {Math.abs(axesValue![i]) >= 0.15 ? <div className="error">error</div> : <div className="ok">ok</div>} */}
      </div>
    );
  }

  if (buttons === 0) {
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
        <p>Connected</p>
        <p>{connectionStatus ? "OK" : ""}</p>
        <p>{gamepadName}</p>
        <AxesAndButtonsWrapper>
          <AxesWrapper>{axesNumber}</AxesWrapper>
          <ButtonsWrapper>{buttonsNumber}</ButtonsWrapper>
        </AxesAndButtonsWrapper>
        {leftX}
        {leftY}
        {rightX}
        {rightY}
        {axes[0]}
        {/* XBOX SVG BELOW*/}
        <svg
          fill="white"
          stroke="black"
          strokeWidth="2"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          // xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 580.032 580.032"
          // xml:space="preserve"
          height="370"
          width="370"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <rect
                  // LB
                  x="122"
                  y="60"
                  width="60"
                  height="27"
                  rx="6.5"
                  fill={lbPressed ? "black" : "white"}
                  stroke="black"
                  strokeWidth="2"
                ></rect>
                <rect
                  // RB
                  x="400"
                  y="60"
                  width="60"
                  height="27"
                  rx="6.5"
                  fill={rbPressed ? "black" : "white"}
                  stroke="black"
                  strokeWidth="2"
                ></rect>
                <rect
                  // LT
                  x="150"
                  y="1"
                  width="27"
                  height="55"
                  rx="8"
                  fill={lt ? `rgba(0,0,0,${lt})` : "rgb(255, 255, 255)"}
                  stroke="black"
                  strokeWidth="2"
                ></rect>
                <rect
                  // LT
                  x="406"
                  y="1"
                  width="27"
                  height="55"
                  rx="8"
                  fill={rt ? `rgba(0,0,0,${rt})` : "rgb(255, 255, 255)"}
                  stroke="black"
                  strokeWidth="2"
                ></rect>
                <path d="M305.053,130c-3.182,1.512-8.127,3.941-8.616,6.634c0,0,13.488,13.14,12.895,25.251c2.754-3.874,4.412-8.58,4.412-13.684 C313.743,140.851,310.316,134.358,305.053,130z"></path>{" "}
                <circle
                  // L AXES AND L3
                  cx={142 + leftX * 8}
                  cy={210.8 + leftY * 8}
                  r="40"
                  strokeWidth={l3Pressed ? "5" : "2"}
                  fill={
                    Math.abs(leftX) > 0.1 || Math.abs(leftY) > 0.1
                      ? `rgba(0,0,0,${Math.abs(leftX) + Math.abs(leftY)})`
                      : "rgb(255, 255, 255)"
                  }
                ></circle>
                <circle
                  // X BUTTON
                  cx="399.932"
                  cy="212.094"
                  r="18.77"
                  fill={XPressed ? "black" : "white"}
                ></circle>{" "}
                <circle
                  // SHARE
                  cx="249.019"
                  cy="212.094"
                  r="9.804"
                  fill={sharePressed ? "black" : "white"}
                ></circle>{" "}
                <path d="M289.796,142.626c-12.007,9.272-15.973,17.062-17.283,21.445c4.345,4.786,10.551,7.852,17.509,7.852 c6.769,0,12.846-2.882,17.173-7.448C306.014,160.184,302.183,152.192,289.796,142.626z"></path>{" "}
                <path
                  // BODY
                  d="M505.765,151.733c-16.255-10.392-4.528-16.329-21.353-29.193c-16.824-12.864-85.104-34.639-96.983-24.743 s-25.233,11.873-25.233,11.873h-72.112h-0.122h-72.118c0,0-13.36-1.977-25.233-11.873c-11.873-9.896-80.16,11.873-96.983,24.743 c-16.824,12.864-5.098,18.801-21.353,29.193C58.02,162.125,15.467,305.619,15.467,305.619s-55.417,159.824,43.544,179.12 c0,0,24.248-15.336,45.025-40.079c20.784-24.743,61.353-59.872,83.128-60.368c21.298-0.483,99.389-0.019,102.792,0l0,0 c0,0,0.024,0,0.061,0c0.043,0,0.062,0,0.062,0l0,0c3.403-0.019,81.494-0.483,102.792,0c21.769,0.496,62.345,35.625,83.128,60.368 s45.024,40.079,45.024,40.079c98.961-19.296,43.544-179.12,43.544-179.12S522.02,162.125,505.765,151.733z M438.047,149.107 c13.728,0,24.89,11.169,24.89,24.89c0,13.721-11.169,24.89-24.89,24.89s-24.89-11.163-24.89-24.89 S424.319,149.107,438.047,149.107z M399.932,187.204c13.727,0,24.89,11.163,24.89,24.89s-11.169,24.89-24.89,24.89 c-13.722,0-24.891-11.169-24.891-24.89S386.204,187.204,399.932,187.204z M332.146,196.17c8.782,0,15.924,7.148,15.924,15.93 s-7.142,15.924-15.924,15.924s-15.925-7.142-15.925-15.924S323.364,196.17,332.146,196.17z M93.062,211.103 c0-27.062,22.02-49.076,49.083-49.076c27.062,0,49.076,22.014,49.076,49.076c0,27.063-22.014,49.083-49.076,49.083 C115.082,260.185,93.062,238.166,93.062,211.103z M256.399,317.578c0,1.689-1.371,3.06-3.06,3.06h-22.448v22.455 c0,1.688-1.371,3.06-3.06,3.06h-24.235c-1.689,0-3.06-1.371-3.06-3.06v-22.455h-22.448c-1.689,0-3.06-1.37-3.06-3.06v-24.235 c0-1.689,1.371-3.059,3.06-3.059h22.448v-22.455c0-1.689,1.371-3.06,3.06-3.06h24.235c1.689,0,3.06,1.371,3.06,3.06v22.455h22.448 c1.689,0,3.06,1.37,3.06,3.059V317.578z M249.019,228.019c-8.782,0-15.924-7.142-15.924-15.924s7.142-15.931,15.924-15.931 s15.924,7.148,15.924,15.931S257.794,228.019,249.019,228.019z M290.022,178.049c-16.457,0-29.841-13.391-29.841-29.847 c0-16.451,13.391-29.841,29.841-29.841c16.45,0,29.841,13.391,29.841,29.841C319.863,164.664,306.479,178.049,290.022,178.049z M365.299,349.745c-27.063,0-49.077-22.021-49.077-49.083c0-27.062,22.014-49.076,49.077-49.076 c27.062,0,49.076,22.014,49.076,49.076C414.375,327.725,392.361,349.745,365.299,349.745z M438.047,277.083 c-13.728,0-24.89-11.163-24.89-24.89s11.169-24.89,24.89-24.89s24.89,11.169,24.89,24.89S451.774,277.083,438.047,277.083z M479.1,236.99c-13.727,0-24.89-11.169-24.89-24.89c0-13.721,11.163-24.89,24.89-24.89c13.728,0,24.891,11.163,24.891,24.89 C503.99,225.828,492.827,236.99,479.1,236.99z"
                ></path>{" "}
                <path d="M299.992,126.751c-3.042-1.42-6.396-2.271-9.97-2.271c-3.604,0-6.989,0.869-10.049,2.313 c5.397,0.417,8.959,2.705,9.822,3.33C290.689,129.486,294.38,127.087,299.992,126.751z"></path>{" "}
                <circle
                  // A BUTTON
                  cx="438.047"
                  cy="252.192"
                  r="18.77"
                  fill={APressed ? "black" : "white"}
                ></circle>{" "}
                <path d="M274.827,130.141c-5.171,4.352-8.525,10.79-8.525,18.066c0,4.829,1.469,9.314,3.954,13.066 c-0.11-11.934,12.907-24.627,12.907-24.627C282.685,134.034,278.009,131.659,274.827,130.141z"></path>{" "}
                <circle
                  // B BUTTON
                  cx="479.1"
                  cy="212.094"
                  r="18.77"
                  fill={BPressed ? "black" : "white"}
                ></circle>{" "}
                <circle
                  // OPTION
                  cx="332.146"
                  cy="212.094"
                  r="9.804"
                  fill={optionsPressed ? "black" : "white"}
                ></circle>{" "}
                <circle
                  // Y BUTTON
                  cx="438.047"
                  cy="173.997"
                  r="18.77"
                  fill={YPressed ? "black" : "white"}
                ></circle>{" "}
                <circle
                  // R AXES AND R3
                  cx={365.2 + rightX * 8}
                  cy={300.8 + rightY * 8}
                  r="40"
                  strokeWidth={r3Pressed ? "5" : "2"}
                  fill={
                    Math.abs(rightX) > 0.1 || Math.abs(rightY) > 0.1
                      ? `rgba(0,0,0,${Math.abs(rightX) + Math.abs(rightY)})`
                      : "rgb(255, 255, 255)"
                  }
                ></circle>
                <path
                  // D-PAD
                  d="M224.771,293.343v-22.454h-18.115v22.454c0,1.689-1.371,3.061-3.06,3.061h-22.448v18.114h22.448 c1.689,0,3.06,1.371,3.06,3.061v22.454h18.115v-22.454c0-1.689,1.371-3.061,3.06-3.061h22.448v-18.114h-22.448 C226.142,296.403,224.771,295.032,224.771,293.343z"
                ></path>{" "}
                <rect
                  // RIGHT D-PAD
                  x="225"
                  y="296.3"
                  width="25.2"
                  height="18.4"
                  fill={rightPressed ? "black" : "white"}
                ></rect>
                <rect
                  // LEFT D-PAD
                  x="181.2"
                  y="296.3"
                  width="25.2"
                  height="18.4"
                  fill={leftPressed ? "black" : "white"}
                ></rect>
                <rect
                  // UP D-PAD
                  x="206.5"
                  y="270.9"
                  width="18.4"
                  height="25.2"
                  fill={upPressed ? "black" : "white"}
                ></rect>
                <rect
                  // DOWN D-PAD
                  x="206.5"
                  y="314.6"
                  width="18.4"
                  height="25.2"
                  fill={downPressed ? "black" : "white"}
                ></rect>
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
        {/* AXES SVG BELOW */}
        <svg height="157" width="335">
          <g transform="translate(78.5 78.5) scale(0.95, 0.95)">
            <circle
              cx="0"
              cy="0"
              r="78.5"
              fill="none"
              stroke="black"
              strokeWidth={l3Pressed ? "5" : "1"}
            ></circle>
            <line x1="0" y1="-78.5" x2="0" y2="78.5" stroke="black"></line>
            <line x1="-78.5" y1="0" x2="78.5" y2="0" stroke="black"></line>
            <line
              x1={leftX * 78.5}
              y1={leftY * 78.5}
              stroke="black"
              strokeWidth="1"
            ></line>
            <circle
              cx={leftX * 78.5}
              cy={leftY * 78.5}
              r="4"
              fill="black"
            ></circle>
          </g>
          <g transform="translate(258.5 78.5) scale(0.95, 0.95)">
            <circle
              cx="0"
              cy="0"
              r="78.5"
              fill="none"
              stroke="black"
              strokeWidth={r3Pressed ? "5" : "1"}
            ></circle>
            <line x1="0" y1="-78.5" x2="0" y2="78.5" stroke="black"></line>
            <line x1="-78.5" y1="0" x2="78.5" y2="0" stroke="black"></line>
            <line
              x1={rightX * 78.5}
              y1={rightY * 78.5}
              stroke="black"
              strokeWidth="1"
            ></line>
            <circle
              cx={rightX * 78.5}
              cy={rightY * 78.5}
              r="4"
              fill="black"
            ></circle>
          </g>
        </svg>
      </>
    );

    // ------------------ PS4 AND PS5
  } else {
    return (
      <>
        <p>Connected</p>
        <p>{connectionStatus ? "OK" : ""}</p>
        <p>{gamepadName}</p>
        <AxesAndButtonsWrapper>
          <AxesWrapper>{axesNumber}</AxesWrapper>
          <ButtonsWrapper>{buttonsNumber}</ButtonsWrapper>
        </AxesAndButtonsWrapper>
        {/* PS4 SVG BELOW*/}
        <svg
          fill="white"
          stroke="black"
          strokeWidth="2"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          // xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 75 575.395 575.395"
          // xml:space="preserve"
          height="370"
          width="370"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <rect
                  // LB
                  x="82"
                  y="137"
                  width="60"
                  height="27"
                  rx="6.5"
                  fill={lbPressed ? "black" : "white"}
                  stroke="black"
                  strokeWidth="2"
                ></rect>
                <rect
                  // RB
                  x="434"
                  y="137"
                  width="60"
                  height="27"
                  rx="6.5"
                  fill={rbPressed ? "black" : "white"}
                  stroke="black"
                  strokeWidth="2"
                ></rect>
                <rect
                  // LT
                  x="110"
                  y="78"
                  width="27"
                  height="55"
                  rx="8"
                  fill={lt ? `rgba(0,0,0,${lt})` : "rgb(255, 255, 255)"}
                  stroke="black"
                  strokeWidth="2"
                ></rect>
                <rect
                  // LT
                  x="440"
                  y="78"
                  width="27"
                  height="55"
                  rx="8"
                  fill={rt ? `rgba(0,0,0,${rt})` : "rgb(255, 255, 255)"}
                  stroke="black"
                  strokeWidth="2"
                ></rect>
                <path
                  // OPTION
                  d="M405.318,229.731c2.809,0,5.098-2.289,5.098-5.098v-13.703c0-2.809-2.289-5.098-5.098-5.098s-5.098,2.289-5.098,5.098 v13.703C400.221,227.443,402.51,229.731,405.318,229.731z"
                  fill={optionsPressed ? "black" : "white"}
                ></path>{" "}
                <circle
                  // Y BUTTON
                  cx="466.5"
                  cy="231.598"
                  r="17.081"
                  fill={YPressed ? "black" : "white"}
                ></circle>{" "}
                <path
                  // PS BUTTON
                  d="M287.178,312.706c-17.424,0-31.598,14.175-31.598,31.598c0,17.424,14.174,31.598,31.598,31.598 c17.423,0,31.597-14.174,31.597-31.598C318.775,326.881,304.602,312.706,287.178,312.706z M279.075,356.177 c-0.012,0.214-0.453,0.545-0.734,0.594c-4.982,0.832-9.835,0.3-14.541-1.523c-0.404-0.159-0.784-0.398-1.139-0.649 c-1.793-1.267-1.787-2.949,0.043-4.125c0.795-0.508,1.646-0.979,2.528-1.303c4.522-1.671,9.069-3.287,13.849-5.007 c0,1.677,0.031,3.226-0.037,4.768c-0.006,0.208-0.496,0.472-0.808,0.588c-2.503,0.918-5.024,1.793-7.528,2.717 c-0.582,0.215-1.107,0.575-1.658,0.863c0.012,0.141,0.024,0.281,0.03,0.422c0.551,0.19,1.114,0.575,1.652,0.539 c1.548-0.11,3.109-0.288,4.621-0.624c1.224-0.275,2.393-0.82,3.77-1.316C279.106,353.576,279.143,354.88,279.075,356.177z M289.26,329.684c-0.172,0.416-0.129,0.93-0.129,1.407c-0.006,9.694,0,19.389,0,29.082c0,0.459,0,0.925,0,1.555 c-2.846-0.899-5.484-1.731-8.116-2.595c-0.208-0.067-0.392-0.397-0.459-0.637c-0.08-0.306-0.031-0.654-0.031-0.985 c0.012-11.45,0.025-22.9,0.037-34.352c0-0.397,0-0.795,0-1.346c0.783,0.152,1.462,0.238,2.111,0.428 c3.715,1.09,7.43,2.173,11.127,3.329c0.967,0.301,1.877,0.814,2.771,1.311c2.92,1.621,4.602,4.094,5.018,7.417 c0.289,2.301,0.393,4.584-0.348,6.836c-1.262,3.807-4.762,4.878-8.451,3.121c-0.289-0.135-0.473-0.765-0.479-1.169 c-0.031-3.88,0.012-7.754-0.043-11.634c-0.012-0.765-0.227-1.609-0.605-2.265c-0.232-0.392-0.998-0.71-1.469-0.643 C289.828,328.582,289.449,329.23,289.26,329.684z M311.498,348.931c1.99,1.322,2.082,2.919,0.08,4.217 c-1.242,0.802-2.65,1.39-4.045,1.903c-5.35,1.971-10.723,3.874-16.09,5.796c-0.232,0.085-0.482,0.128-0.898,0.244 c0-1.585-0.043-3.011,0.035-4.425c0.02-0.293,0.473-0.685,0.809-0.808c3.873-1.42,7.771-2.79,11.658-4.18 c0.514-0.184,1.047-0.343,1.523-0.605c0.289-0.159,0.479-0.49,0.711-0.747c-0.27-0.208-0.508-0.526-0.814-0.6 c-1.719-0.435-3.414-0.221-5.066,0.354c-2.521,0.875-5.031,1.775-7.547,2.662c-0.373,0.129-0.746,0.239-1.303,0.423 c0-1.708-0.025-3.262,0.029-4.811c0.006-0.208,0.387-0.508,0.648-0.588c6.586-2.074,13.098-2.007,19.5,0.741 C310.996,348.612,311.254,348.766,311.498,348.931z"
                  fill={logoPressed ? "black" : "white"}
                ></path>{" "}
                <circle
                  // B BUTTON
                  cx="506.592"
                  cy="271.69"
                  r="17.081"
                  fill={BPressed ? "black" : "white"}
                ></circle>{" "}
                <circle
                  // L AXES AND L3
                  cx={190.7 + leftX * 7}
                  cy={354 + leftY * 7}
                  r="25"
                  strokeWidth={l3Pressed ? "5" : "2"}
                  fill={
                    Math.abs(leftX) > 0.1 || Math.abs(leftY) > 0.1
                      ? `rgba(0,0,0,${Math.abs(leftX) + Math.abs(leftY)})`
                      : "rgb(255, 255, 255)"
                  }
                ></circle>
                <circle
                  // R AXES AND R3
                  cx={378.2 + rightX * 7}
                  cy={354 + rightY * 7}
                  r="25"
                  strokeWidth={r3Pressed ? "5" : "2"}
                  fill={
                    Math.abs(rightX) > 0.1 || Math.abs(rightY) > 0.1
                      ? `rgba(0,0,0,${Math.abs(rightX) + Math.abs(rightY)})`
                      : "rgb(255, 255, 255)"
                  }
                ></circle>
                <path
                  // BODY
                  d="M507.834,193.63c-1.297-1.995-3.824-3.678-7.178-5.08v-5.202c0,0-29.75-20.067-69.211-3.751c0,0-1.256,1.064-1.738,6.591 c-2.484,0.551-4.639,1.182-6.396,1.891c-7.668,3.103-12.564,2.283-12.564,2.283h-26.773c0.973,2.075,1.561,4.364,1.561,6.806 v82.62c0,8.886-7.229,16.114-16.115,16.114h-164.48c-8.886,0-16.114-7.229-16.114-16.114v-82.62c0-2.442,0.587-4.73,1.561-6.806 h-25.747c0,0-4.896,0.814-12.564-2.283c-1.756-0.709-3.911-1.34-6.389-1.891c-0.49-5.526-1.744-6.591-1.744-6.591 c-39.462-16.316-69.211,3.751-69.211,3.751v5.202c-3.348,1.402-5.875,3.079-7.179,5.08c0,0-24.805,37.203-31.983,62.656 S-6.208,424.685,0.976,479.507c7.179,54.829,90.074,68.532,111.61,25.453c21.537-43.078,35.9-95.294,35.9-95.294 s8.482-6.2,10.44-6.2c0,0,36.555,30.35,76.041-2.613h105.454c39.486,32.963,76.041,2.613,76.041,2.613 c1.959,0,10.447,6.2,10.447,6.2s14.357,52.216,35.9,95.294c21.541,43.079,104.432,29.37,111.609-25.453 c7.18-54.829-27.412-197.768-34.59-223.221C532.639,230.833,507.834,193.63,507.834,193.63z M157.82,210.931 c0-6.187,5.03-11.218,11.218-11.218s11.218,5.031,11.218,11.218v13.703c0,6.187-5.03,11.218-11.218,11.218 s-11.218-5.031-11.218-11.218V210.931z M87.984,233.557c0.673-9.357,13.292-9.364,18.678-9.37 c5.428,0.006,18.054,0.012,18.721,9.37c0.318,4.418-1.194,19.333-3.25,23.452c-1.781,3.556-10.483,9.939-13.452,12.044 c-0.159,0.134-0.336,0.263-0.526,0.367c-0.459,0.245-0.961,0.373-1.463,0.373c-0.085,0-0.159-0.006-0.238-0.012 c-0.484-0.037-0.955-0.184-1.383-0.447c-0.135-0.085-0.269-0.171-0.386-0.281c-2.968-2.112-11.652-8.477-13.433-12.038 C89.196,252.902,87.678,237.981,87.984,233.557z M66.546,292.395c-9.357-0.674-9.364-13.293-9.37-18.679 c0.006-5.435,0.012-18.054,9.37-18.721c0.459-0.031,1.004-0.049,1.622-0.049c5.214,0,18.011,1.396,21.824,3.299 c3.562,1.775,9.945,10.483,12.05,13.452c0.135,0.159,0.263,0.337,0.367,0.526c0.281,0.533,0.404,1.126,0.361,1.702 c-0.037,0.483-0.184,0.955-0.447,1.383c-0.085,0.135-0.171,0.27-0.281,0.386c-2.111,2.968-8.482,11.653-12.044,13.433 c-3.819,1.909-16.634,3.305-21.848,3.305C67.543,292.443,67.005,292.425,66.546,292.395z M125.384,313.839 c-0.661,9.352-13.287,9.357-18.678,9.363h-0.019c-5.416-0.006-18.023-0.012-18.703-9.363c-0.312-4.431,1.206-19.346,3.256-23.452 c1.781-3.567,10.483-9.945,13.445-12.056c0.178-0.153,0.379-0.288,0.606-0.392c0.128-0.067,0.263-0.129,0.398-0.166 c0.814-0.275,1.689-0.22,2.454,0.19c0.227,0.122,0.435,0.269,0.624,0.44c3.06,2.173,11.604,8.458,13.36,11.983 C124.184,294.506,125.696,309.42,125.384,313.839z M146.834,292.395c-0.459,0.03-0.998,0.049-1.603,0.049 c-5.221,0-18.036-1.401-21.854-3.305c-3.562-1.781-9.933-10.472-12.044-13.44c-0.098-0.116-0.184-0.239-0.269-0.373 c-0.38-0.612-0.526-1.322-0.441-2.007c0.043-0.374,0.153-0.734,0.343-1.077c0.11-0.208,0.239-0.392,0.386-0.569 c2.129-2.993,8.482-11.646,12.026-13.421c3.812-1.91,16.616-3.299,21.83-3.299c0.618,0,1.157,0.018,1.628,0.049 c9.352,0.661,9.358,13.287,9.364,18.678C156.192,279.102,156.186,291.721,146.834,292.395z M190.892,387.285 c-18.403,0-33.373-14.97-33.373-33.373c0-18.408,14.97-33.378,33.373-33.378c18.409,0,33.378,14.97,33.378,33.378 C224.271,372.315,209.301,387.285,190.892,387.285z M287.178,378.968c-19.113,0-34.658-15.545-34.658-34.657 c0-19.113,15.545-34.658,34.658-34.658s34.658,15.545,34.658,34.658C321.836,363.423,306.291,378.968,287.178,378.968z M466.5,208.397c12.791,0,23.201,10.41,23.201,23.201c0,12.791-10.41,23.201-23.201,23.201s-23.201-10.41-23.201-23.201 C443.299,218.808,453.709,208.397,466.5,208.397z M394.1,210.931c0-6.187,5.031-11.218,11.219-11.218s11.219,5.031,11.219,11.218 v13.703c0,6.187-5.031,11.218-11.219,11.218s-11.219-5.031-11.219-11.218V210.931z M378.482,387.285 c-18.408,0-33.379-14.97-33.379-33.373c0-18.408,14.971-33.378,33.379-33.378c18.402,0,33.373,14.97,33.373,33.378 C411.855,372.315,396.885,387.285,378.482,387.285z M426.408,294.892c-12.791,0-23.201-10.411-23.201-23.201 c0-12.791,10.41-23.201,23.201-23.201s23.201,10.41,23.201,23.201C449.609,284.481,439.205,294.892,426.408,294.892z M466.5,334.978c-12.791,0-23.201-10.41-23.201-23.201s10.41-23.201,23.201-23.201s23.201,10.41,23.201,23.201 S479.291,334.978,466.5,334.978z M506.592,294.892c-12.791,0-23.201-10.411-23.201-23.201c0-12.791,10.41-23.201,23.201-23.201 s23.201,10.41,23.201,23.201C529.793,284.481,519.383,294.892,506.592,294.892z"
                ></path>{" "}
                <circle
                  // X BUTTON
                  cx="426.408"
                  cy="271.69"
                  r="17.081"
                  fill={XPressed ? "black" : "white"}
                ></circle>{" "}
                <circle
                  // A BUTTON
                  cx="466.5"
                  cy="311.776"
                  r="17.081"
                  fill={APressed ? "black" : "white"}
                ></circle>{" "}
                <path
                  // SHARE
                  d="M169.038,229.731c2.809,0,5.098-2.289,5.098-5.098v-13.703c0-2.809-2.289-5.098-5.098-5.098s-5.098,2.289-5.098,5.098 v13.703C163.939,227.443,166.229,229.731,169.038,229.731z"
                  fill={sharePressed ? "black" : "white"}
                ></path>{" "}
                <path
                  // DOWN BUTTON
                  d="M106.687,284.444c-4.572,3.36-9.29,7.313-9.97,8.678c-1.23,2.454-2.943,15.723-2.625,20.276 c0.171,2.436,4.407,3.678,12.571,3.684l0.043,3.061v-3.061c8.17-0.006,12.393-1.242,12.57-3.684 c0.331-4.548-1.389-17.81-2.62-20.276C116.032,291.88,111.656,288.098,106.687,284.444z"
                  fill={downPressed ? "black" : "white"}
                ></path>{" "}
                <path
                  // LEFT BUTTON
                  d="M87.256,263.728c-2.179-1.095-13.421-2.656-19.088-2.656c-0.446,0-0.851,0.012-1.181,0.037 c-2.442,0.171-3.684,4.4-3.69,12.57c0.006,8.207,1.242,12.436,3.69,12.613c0.331,0.024,0.716,0.037,1.157,0.037 c5.673,0,16.928-1.566,19.113-2.662c1.365-0.679,5.318-5.397,8.678-9.969C92.28,268.722,88.499,264.346,87.256,263.728z"
                  fill={leftPressed ? "black" : "white"}
                ></path>{" "}
                <path
                  // UP BUTTON
                  d="M106.687,262.945c4.969-3.647,9.345-7.43,9.969-8.672c1.23-2.46,2.944-15.729,2.62-20.276 c-0.171-2.442-4.4-3.684-12.57-3.69c-8.207,0.006-12.436,1.243-12.614,3.69c-0.324,4.547,1.396,17.821,2.625,20.276 C97.391,255.625,102.115,259.585,106.687,262.945z"
                  fill={upPressed ? "black" : "white"}
                ></path>{" "}
                <path
                  // RIGHT BUTTON
                  d="M146.394,261.109c-0.343-0.024-0.741-0.037-1.188-0.037c-5.673,0-16.916,1.561-19.094,2.656 c-1.242,0.625-5.024,4.994-8.672,9.97c3.36,4.572,7.313,9.296,8.672,9.969c2.356,1.175,15.533,2.962,20.282,2.625 c2.436-0.171,3.678-4.406,3.684-12.57C150.072,265.509,148.835,261.28,146.394,261.109z"
                  fill={rightPressed ? "black" : "white"}
                ></path>{" "}
                <path
                  // TOUCH PANEL
                  d="M194.943,197.173v82.62c0,5.508,4.48,9.994,9.994,9.994h164.48c5.508,0,9.994-4.48,9.994-9.994v-82.62 c0-2.632-1.039-5.019-2.717-6.806H197.661C195.984,192.155,194.943,194.536,194.943,197.173z"
                  fill={touchbarPressed ? "black" : "white"}
                ></path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
        {/* AXES SVG BELOW */}
        <svg height="157" width="335">
          <g transform="translate(78.5 78.5) scale(0.95, 0.95)">
            <circle
              cx="0"
              cy="0"
              r="78.5"
              fill="none"
              stroke="black"
              strokeWidth={l3Pressed ? "5" : "1"}
            ></circle>
            <line x1="0" y1="-78.5" x2="0" y2="78.5" stroke="black"></line>
            <line x1="-78.5" y1="0" x2="78.5" y2="0" stroke="black"></line>
            <line
              x1={leftX * 78.5}
              y1={leftY * 78.5}
              stroke="black"
              strokeWidth="1"
            ></line>
            <circle
              cx={leftX * 78.5}
              cy={leftY * 78.5}
              r="4"
              fill="black"
            ></circle>
          </g>
          <g transform="translate(258.5 78.5) scale(0.95, 0.95)">
            <circle
              cx="0"
              cy="0"
              r="78.5"
              fill="none"
              stroke="black"
              strokeWidth={r3Pressed ? "5" : "1"}
            ></circle>
            <line x1="0" y1="-78.5" x2="0" y2="78.5" stroke="black"></line>
            <line x1="-78.5" y1="0" x2="78.5" y2="0" stroke="black"></line>
            <line
              x1={rightX * 78.5}
              y1={rightY * 78.5}
              stroke="black"
              strokeWidth="1"
            ></line>
            <circle
              cx={rightX * 78.5}
              cy={rightY * 78.5}
              r="4"
              fill="black"
            ></circle>
          </g>
        </svg>
      </>
    );
  }
}
